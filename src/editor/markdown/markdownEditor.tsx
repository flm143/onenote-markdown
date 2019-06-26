import React from "react";
import EditorBase, { BeforeInputType } from "../editorBase";
import styles from "./markdownEditor.module.css";
import { connect } from "react-redux";
import { PageContent } from "../../page/pageModel";
import { State } from "../../reducer";
import {
  insertContent,
  InsertContentAction,
} from "../../page/contentTree/actions";
import { Dispatch } from "redux";
import {
  SplitStructureAction,
  splitStructureNode,
} from "../../page/structureTree/actions";
import renderPage from "./renderPage";
import getEditorSelection from "./selection";

export function MarkdownEditorComponent(
  props: MarkdownEditorStateProps & MarkdownEditorDispatchProps,
): JSX.Element {
  function onBeforeInput(e: BeforeInputType): void {
    e.preventDefault();
    const selection = getEditorSelection();
    if (selection === null) {
      return;
    }

    const content = e.data;
    const { start, end } = selection;

    if (content === "\n") {
      // TODO: split
    } else {
      props.insertContent(
        props.pageId,
        content,
        start.nodeOffset + start.localOffset,
        start.structureNodeIndex,
        start.nodeOffset,
      );
    }
  }

  return (
    <div className={styles.editor}>
      <EditorBase
        renderPage={renderPage}
        page={props.page}
        onBeforeInput={onBeforeInput}
      />
    </div>
  );
}

/**
 * Props for the `MarkdownEditorComponent`
 */
interface MarkdownEditorStateProps {
  pageId: string;
  page: PageContent;
}

interface MarkdownEditorDispatchProps {
  insertContent: (
    pageId: string,
    content: string,
    globalOffset: number,
    nodeIndex: number,
    nodeOffset: number,
  ) => InsertContentAction;
  splitStructureNode: (
    pageId: string,
    nodeIndex: number,
    nodeOffset: number,
    localOffset: number,
  ) => SplitStructureAction;
}

const mapStateToProps = (state: State): MarkdownEditorStateProps => ({
  page: state.pages[state.selectedPage],
  pageId: state.selectedPage,
});

const mapDispatchToProps = (
  dispatch: Dispatch,
): MarkdownEditorDispatchProps => ({
  insertContent: (
    pageId,
    content,
    offset,
    nodeIndex,
    nodeOffset,
  ): InsertContentAction =>
    dispatch(insertContent(pageId, content, offset, nodeIndex, nodeOffset)),
  splitStructureNode: (
    pageId: string,
    nodeIndex: number,
    nodeOffset: number,
    localOffset: number,
  ): SplitStructureAction =>
    dispatch(splitStructureNode(pageId, nodeIndex, nodeOffset, localOffset)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarkdownEditorComponent);

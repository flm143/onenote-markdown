import { ContentInsert } from "./insert";
import { PageActionPartial } from "../actions";

//#region Insert content
export const INSERT_CONTENT = "INSERT_CONTENT";

export interface InsertContentAction extends PageActionPartial, ContentInsert {
  structureNodeIndex: number;
}

export const insertContent = (
  pageId: string,
  content: string,
  offset: number,
  structureNodeIndex: number,
): InsertContentAction => ({
  content,
  offset,
  pageId,
  structureNodeIndex,
  type: INSERT_CONTENT,
});
//#endregion

export interface Location {
  readonly contentOffset: number;
  readonly structureNodeIndex: number;
}

export interface ContentLocations {
  readonly start: Location;
  readonly end: Location;
}

//#region Delete content
export const DELETE_CONTENT = "DELETE_CONTENT";

export interface DeleteContentAction extends PageActionPartial {
  contentLocations: ContentLocations;
}

export const deleteContent = (
  pageId: string,
  contentLocations: ContentLocations,
): DeleteContentAction => ({
  contentLocations,
  pageId,
  type: DELETE_CONTENT,
});
//#endregion

//#region Replace content
export const REPLACE_CONTENT = "REPLACE_CONTENT";

export interface ReplaceContentAction extends PageActionPartial {
  readonly content: string;
  readonly contentLocations: ContentLocations;
}

export const replaceContent = (
  pageId: string,
  content: string,
  contentLocations: ContentLocations,
): ReplaceContentAction => ({
  content,
  contentLocations,
  pageId,
  type: REPLACE_CONTENT,
});
//#endregion

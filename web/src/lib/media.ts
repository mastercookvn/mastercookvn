export const MEDIA_FOLDER = {
  Dishes: "dishes",
  Ingredients: "ingredients",
  Services: "services",
  Scenes: "scenes",
} as const;

export type MediaFolder = (typeof MEDIA_FOLDER)[keyof typeof MEDIA_FOLDER];

/** Object key in the bucket, e.g. `dishes/goi.jpg`. Records store this, never a URL. */
export type MediaKey = `${MediaFolder}/${string}`;

export const MEDIA_ROUTE = "/api/media";

const MEDIA_KEY_PATTERN = new RegExp(
  `^(${Object.values(MEDIA_FOLDER).join("|")})/[a-z0-9][a-z0-9._-]*\\.(jpg|jpeg|png|webp)$`,
  "i"
);

export const isMediaKey = (key: string): key is MediaKey =>
  MEDIA_KEY_PATTERN.test(key) && !key.includes("..");

export const mediaKey = (folder: MediaFolder, fileName: string): MediaKey =>
  `${folder}/${fileName}`;

export const newMediaKey = (folder: MediaFolder): MediaKey =>
  mediaKey(folder, `${crypto.randomUUID()}.jpg`);

/** Same-origin path; the route handler redirects to a short-lived signed S3 URL. */
export const mediaUrl = (key: MediaKey) => `${MEDIA_ROUTE}/${key}`;

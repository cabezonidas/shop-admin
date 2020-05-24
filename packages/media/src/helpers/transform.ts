interface ITransformation {
  height?: string;
  width?: string;
  aspectRatio?: string;
  quality?: string;
  crop?: string;
  cropMode?: string;
  x?: string;
  y?: string;
  focus?: string;
  format?: string;
  radius?: string;
  background?: string;
  border?: string;
  rotation?: string;
  blur?: string;
  named?: string;
  overlayImage?: string;
  overlayX?: string;
  overlayY?: string;
  overlayFocus?: string;
  overlayHeight?: string;
  overlayWidth?: string;
  overlayText?: string;
  overlayTextFontSize?: string;
  overlayTextFontFamily?: string;
  overlayTextColor?: string;
  overlayAlpha?: string;
  overlayTextTypography?: string;
  overlayBackground?: string;
  overlayImageTrim?: string;
  progressive?: string;
  lossless?: string;
  trim?: string;
  metadata?: string;
  colorProfile?: string;
  defaultImage?: string;
  dpr?: string;
  effectSharpen?: string;
  effectUSM?: string;
  effectContrast?: string;
  effectGray?: string;
  original?: string;
}

const keys: ITransformation = {
  height: "h",
  width: "w",
  aspectRatio: "ar",
  quality: "q",
  crop: "c",
  cropMode: "cm",
  x: "x",
  y: "y",
  focus: "fo",
  format: "f",
  radius: "r",
  background: "bg",
  border: "bo",
  rotation: "rt",
  blur: "bl",
  named: "n",
  overlayImage: "oi",
  overlayX: "ox",
  overlayY: "oy",
  overlayFocus: "ofo",
  overlayHeight: "oh",
  overlayWidth: "ow",
  overlayText: "ot",
  overlayTextFontSize: "ots",
  overlayTextFontFamily: "otf",
  overlayTextColor: "otc",
  overlayAlpha: "oa",
  overlayTextTypography: "ott",
  overlayBackground: "obg",
  overlayImageTrim: "oit",
  progressive: "pr",
  lossless: "lo",
  trim: "t",
  metadata: "md",
  colorProfile: "cp",
  defaultImage: "di",
  dpr: "dpr",
  effectSharpen: "e-sharpen",
  effectUSM: "e-usm",
  effectContrast: "e-contrast",
  effectGray: "e-grayscale",
  original: "orig",
};

export const transform = (photoUrl: string, transformation?: ITransformation) => {
  try {
    const url = new URL(photoUrl);
    let transformedUrl = `https://ik.imagekit.io/syuhz8bmxl${url.pathname}`;
    if (transformation) {
      const params = Object.keys(transformation)
        .map(key => `${keys[key]}-${transformation[key]}`)
        .join(",");
      if (params) {
        transformedUrl += `?tr=${params}`;
      }
    }
    return decodeURIComponent(transformedUrl);
  } catch {
    return photoUrl;
  }
};

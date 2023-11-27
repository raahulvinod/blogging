import Embed from '@editorjs/embed';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import { uploadImage } from '../utils/aws';

const uploadImageByUrl = async (url) => {
  try {
    return {
      success: 1,
      file: { url },
    };
  } catch (error) {
    console.error('Error uploading image by URL:', error);
    return {
      success: 0,
      file: { url: '' },
    };
  }
};

const uploadImageByFile = async (e) => {
  try {
    const url = await uploadImage(e);

    if (url) {
      return {
        success: 1,
        file: { url },
      };
    } else {
      throw new Error('Failed to upload image by file');
    }
  } catch (error) {
    console.error('Error uploading image by file:', error);
  }
};

export const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    config: {
      placeholder: 'Type Heading...',
      levels: [2, 3],
      defaultLevel: 2,
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  marker: Marker,
  inlineCode: InlineCode,
};

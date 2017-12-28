import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js';

class Content {
  saveDraft(content) {
    const a = content.getCurrentContent()
    const b = convertToRaw(a)
    return JSON.stringify(b)
  }

  loadDraft(content) {
    const a = JSON.parse(content)
    const b = convertFromRaw(a)
    return EditorState.createWithContent(b)
  }
}
export let content = new Content();
import { Component } from "../../core";
import TuiImageEditor from "tui-image-editor";
import FileSaver from "file-saver";

import "tui-image-editor/dist/tui-image-editor.css";
// import "tui-color-picker/dist/tui-color-picker.css";

export class ImageEditor extends Component {
  render() {
    const wrapper = document.createElement("div");
    wrapper.id = "tui-image-editor";
    this.el.className = "h-[800px]";
    this.el.append(wrapper);
    const instance = new TuiImageEditor(
      this.el.querySelector("#tui-image-editor"),
      {
        includeUI: {
          // loadImage: {
          //   path: "img/sampleImage.jpg",
          //   name: "SampleImage",
          // },
          initMenu: "crop",
          menuBarPosition: "bottom",
        },
        cssMaxWidth: 700,
        cssMaxHeight: 700,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70,
        },
      },
    );
  }
}

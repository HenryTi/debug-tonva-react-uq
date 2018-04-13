var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { Page } from 'tonva-tools';
export class 货品MainPage extends React.Component {
    render() {
        return React.createElement(Page, { header: "\u8D27\u54C1\u4E3B\u9875" }, "\u8D27\u54C1\u4E3B\u9875");
    }
}
export class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.state = {
            files: undefined,
        };
    }
    onFilesChange(evt) {
        let files = [];
        for (let f of evt.target.files)
            files.push(f);
        this.setState({
            files: files,
        });
    }
    fileClick(file) {
        let fr = new FileReader();
        fr.onload = function (f) {
            alert(this.result);
        };
        fr.readAsText(file, "utf8");
    }
    onSubmit(evt) {
        return __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            var files = evt.target[0].files;
            var data = new FormData();
            for (let i in files) {
                data.append("file" + i, files[i]);
            }
            let res = yield fetch("http://localhost:3009/upload", {
                method: "POST",
                body: data
            });
            let json = yield res.json();
            alert(JSON.stringify(json));
        });
    }
    render() {
        let { files } = this.state;
        let fileList;
        if (files !== undefined) {
            fileList = React.createElement("ul", null, files.map((v, i) => React.createElement("li", { key: i, onClick: () => this.fileClick(v) },
                "name:",
                v.name,
                " size:",
                v.size,
                " date:",
                v.lastModifiedDate.toString())));
        }
        let button;
        if (files !== undefined && files.length > 0) {
            button = React.createElement("div", null,
                React.createElement("button", { type: "submit" }, "\u5347\u7EA7\u6570\u636E\u5E93"));
        }
        return React.createElement(Page, { header: "FileUpload test" },
            fileList,
            React.createElement("form", { className: "my-2", encType: "multipart/form-data", onSubmit: this.onSubmit },
                React.createElement("div", null,
                    React.createElement("input", { type: "file", id: "photo", name: "files", multiple: true, onChange: this.onFilesChange })),
                button));
    }
}
//# sourceMappingURL=货品MainPage.js.map
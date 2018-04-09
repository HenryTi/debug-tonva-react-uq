import * as React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {nav, Page} from 'tonva-tools';
import {LMR, SearchBox} from 'tonva-react-form';
//import {Tuid} from '../../entities';
import {EntitiesUIProps, TuidUIProps} from '../../ui-usql/ui';

export class 货品MainPage extends React.Component<TuidUIProps> {
    render() {
        return <Page header="货品主页">货品主页</Page>;
    }
}

interface State {
    files: any[];
}
export class FileUpload extends React.Component<TuidUIProps, State> {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFilesChange = this.onFilesChange.bind(this);
        this.state = {
            files: undefined,
        }
    }
    onFilesChange(evt) {
        let files:any[] = [];
        for (let f of evt.target.files) files.push(f);
        this.setState({
            files: files,
        });
    }
    fileClick(file) {
        let fr = new FileReader();
        fr.onload = function(f) {
            alert(this.result);
        }
        fr.readAsText(file, "utf8");
    }
    async onSubmit(evt:React.FormEvent<any>) {        
        evt.preventDefault();
        var files = (evt.target[0] as any).files;
        var data = new FormData();
        for (let i in files) {
            data.append("file" + i, files[i]);
        }
  
        let res = await fetch("http://localhost:3009/upload", {
          method: "POST",
          body: data
        });
        let json = await res.json();
        alert(JSON.stringify(json));
    }
    render() {
        let {files} = this.state;
        let fileList;
        if (files !== undefined) {
            fileList = <ul>
                {
                    files.map((v,i) => <li key={i} onClick={()=>this.fileClick(v)}>
                        name:{v.name} size:{v.size} date:{v.lastModifiedDate.toString()}
                    </li>)}
            </ul>;
        }
        let button;
        if (files !== undefined && files.length > 0) {
            button = <div>
                <button type="submit">升级数据库</button>
            </div>;
        }
        return <Page header="FileUpload test">
            {fileList}
            <form className="my-2" encType="multipart/form-data" onSubmit={this.onSubmit}>
                <div>
                    <input type="file" id="photo"  name="files" multiple={true} onChange={this.onFilesChange} />
                </div>
                {button}
            </form>
        </Page>;
    }
}

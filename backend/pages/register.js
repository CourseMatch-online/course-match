import React from 'react';
import Head from 'next/head'
import Dropzone from 'react-dropzone'
import styles from '../styles/Register.module.css'
import url from '../lib/url';
import request from "superagent";

export default class Regiser extends React.Component{
  constructor(props){
    super(props);
    this.state={email: '', fileSelected: false, fileName: ''};
  }
  handleUpload = (files) => {
    this.setState({fileSelected: true})
    let file = files[0];
    this.setState({fileName: file.name})
    if(file.name.split('.')[1] != "pdf"){
      alert("only accepts PDFs");
      return;
    }
    const req = request.post(url + 'fileUpload');
    files.forEach(file => {
      req.attach("userfile", file);
      req.field('email', this.state.email);
    });
    console.log(req);
    req.end();
  }
  handleTextChange = (event) => {
      this.setState({email: event.target.value});
  }
  render(){
    return(
      <div className={styles.container}>
        <Head>
          <title>Course Match</title>
          <link rel="shortcut icon" href="/logo.png" />
        </Head>
        <header className={styles.header}>
          <img className={styles.logo}
            src="/logo2.jpg"
          ></img>
          <h1>course match</h1>
        </header>
        <main className={styles.main}>
          <h1 className={styles.title}>Get Started</h1>
        <h2 className={styles.subtitle}>Enter your university email:</h2>

          <input className={styles.input} type="text" label="Email" onChange={this.handleTextChange} placeholder="Email"/>
          {this.state.email.split('@')[1] == 'uwaterloo.ca' && <div className={styles.subcontainer}>
            <h2 className={styles.subtitle2}>Submit your proof of enrollment:</h2>
            <p className={styles.text}>( This is to confirm the courses you are in )</p>
            <Dropzone onDrop={this.handleUpload}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()} className={styles.dragndrop}>
                    <input {...getInputProps()} />
                    <img className={styles.upload}
                      src="/upload.png"
                    ></img>
                      <p style={{margin: '0'}}>{this.state.fileSelected ? 'File Selected: ' + this.state.fileName : "Drag & Drop or Click to Browse"}</p>

                  </div>
                </section>
              )}
            </Dropzone> 
            <div>

              <a href="/submitted" className={styles.ghostbutton}>
                Submit
              </a>
            </div>
          </div>}
        </main>

        <footer className={styles.footer}>
          A Hack The North Project
        </footer>
      {/*<form action="/api/fileUpload" enctype="multipart/form-data" method="post">
      <input type="text" name="title"/><br/>
      <input type="file" name="upload" multiple="multiple"/><br/>
      <input type="submit" value="Upload"/>
      </form>*/}
      </div>
    )
  }
}
import React, {Component} from "react";
import Article from "./components/Article";
import LangContext from "./components/lang_context";


const EN = {
  title: 'NVIDIA NEWS',
  title_name: 'NVIDIA Accelerated AI on Azure',
  description: 'Article description:',
  description_text: 'NVIDIA on Azure is bringing AI, networking, and high-performance computing to the enterprise.',
  btn_read: 'Read',
  current_lang: 'EN'
}
const UA = {
  title: 'НОВИНИ NVIDIA',
  title_name: 'Прискорений штучний інтелект NVIDIA в Azure',
  description: 'Опис статті:',
  description_text: 'NVIDIA на Azure надає підприємствам можливості штучного інтелекту, мереж та високопродуктивних обчислень.',
  btn_read: 'Читати',
  current_lang: 'UA'
}

let langBtns;
class App extends Component{
  state = {lang: EN};

componentDidMount() {
    langBtns = document.querySelectorAll('.lang-btn');

    const lang = localStorage.getItem('lang');
    if (lang) {
      lang === 'UA' ? this.setState({ lang: UA }) : this.setState({ lang: EN });
    } else {
      this.setState({ lang: EN });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.lang !== this.state.lang) {
      langBtns.forEach(btn => btn.classList.remove('active'));
      this.state.lang.current_lang === 'UA'
        ? langBtns[0].classList.add('active')
        : langBtns[1].classList.add('active');
      
      localStorage.setItem('lang', this.state.lang.current_lang);
    }
  }

  
  SetLangEN(){
    this.setState({lang: EN})
  }

  SetLangUA(){
    this.setState({lang: UA})
  }

  render() {
    const { title, title_name } = this.state.lang;
    return (
      <div className="wrapper">
          <h1 className="title">{title}</h1>
        <LangContext.Provider value={this.state.lang}>

            <Article lang = {this.state.lang}>
            <div className="article__title">
              <h2>{title_name}</h2>
            </div> 
            </Article>
        </LangContext.Provider>
        
          <div className="lang">
            <button onClick={this.SetLangUA.bind(this)} 
            className="lang-btn">UA</button>
            <button onClick={this.SetLangEN.bind(this)}
            className="lang-btn">EN</button>
            </div>
      </div> )}}

export default App;
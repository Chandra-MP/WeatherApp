
import './App.css';
import Header from './components/Header'
import Mainbody from './components/Mainbody';
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className='appwrapper container-fluid'>
        <Header />
        <Mainbody/>
        <Footer />
      </div>
    </>
  );
}

export default App;

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from './components/Navigation';
import Detail from './pages/v1/Detail';
import Edit from './pages/v1/Edit';
import Home from './pages/v1/Home';
import Tambah from './pages/v1/Tambah';
import Detailv2 from './pages/v2/Detail';
import Editv2 from './pages/v2/Edit';
import Homev2 from './pages/v2/Home';
import Tambahv2 from './pages/v2/Tambah';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/" exact children={() => <Home />} />
          <Route path="/detail/:id" children={() => <Detail />} />
          <Route path="/edit/:id" children={() => <Edit />} />
          <Route path="/tambah" children={() => <Tambah />} />
          <Route path="/v2" exact children={() => <Homev2 />} />
          <Route path="/v2/detail/:id" children={() => <Detailv2 />} />
          <Route path="/v2/edit/:id" children={() => <Editv2 />} />
          <Route path="/v2/tambah" children={() => <Tambahv2 />} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
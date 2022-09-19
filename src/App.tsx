import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './paginas/admin/PaginaBaseAdmin';
import AdministracaoPratos from './paginas/admin/pratos/AdministracaoPratos';
import FormularioPrato from './paginas/admin/pratos/FormularioPrato';
import AdministracaoRestaurantes from './paginas/admin/restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/admin/restaurantes/FormularioRestaurante';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>

        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />


        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />


      </Route>

    </Routes>
  );
}

export default App;
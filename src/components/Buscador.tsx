import './Buscador.css'
import { Buscar } from './Icons';

function Buscador() {
    return(
        <>
        <h2 className= 'titulo' > Encuentra tu pokemon</h2>
        <section className='container-buscar'>
            <input type='text' placeholder='Encuentra tu pokemon' 
            className='input-buscar' />
            <button className='btn-buscar'>
            <Buscar />
                Buscar pokemon
            </button>
        </section>
        
        </>
        
    )
}
export default Buscador;
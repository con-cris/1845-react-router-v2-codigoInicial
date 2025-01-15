import { useState, useEffect } from 'react'
import "../assets/css/blog.css"
import { buscar } from '../api/api'
import ListCategories from '../Components/ListCategories'
import ListPosts from '../Components/ListPosts'
import SubCategoria from './SubCategoria'
import { useParams, Routes, Route, Link, useResolvedPath } from 'react-router-dom'

const Categoria = () => {
    const [subcategorias, setSubcategorias] = useState([])
    const { id } = useParams() //obtiene las categorias de Bienestar o Comportamiento

    const url = useResolvedPath("").pathname //Usamos el hook useResolvedPath para crear caminos dinámicos.


    useEffect(() => {
        buscar(`/categorias?id=${id}`, (response) => {
            setSubcategorias(response[0].subcategorias)
        })
    }, [id])//, [id] Se ejecuta cada vez que haya un cambio en el id


    return (
        <>
            <div className='container'>
                <h2 className='title-page'>Pet Noticias</h2>
            </div>
            <ListCategories />
            <ul className='category-list container flex'>
                {
                    subcategorias.map(subcategoria => (
                        <li className={`category-list__category category-list__category--${id}`} key={subcategoria}>
                            <Link to={`${url}/${subcategoria}`}>
                                {subcategoria}
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <Routes>
                <Route path='/' element={<ListPosts url={`/posts?categoria=${id}`} />} />
                <Route path='/:subcategoria' element={<SubCategoria />} />
            </Routes>

        </>
    )
}

export default Categoria

import React from 'react';
import useProducts from '../hooks/useProducts';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import BussinessSummery from './BussinessSummery';
import Company from './Company';
import Offer from './Offer';
import ProductCard from './ProductCard';
import { GiArmoredBoomerang } from 'react-icons/gi';
import Contact from './Contact';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [products] = useProducts();
    return (
        <div className=''>
            <Banner></Banner>
            <Company></Company>
            <Offer></Offer>
            <div>
                <div className='text-center my-10'>
                    <h3 className='text-3xl text-primary font-bold tracking-[.20em]'>YOU CAN BUY NOW!</h3>
                    <p className='font-bold'>Don't hesitate to buy, Huh!</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-10'>
                    {
                        products.slice(0, 6).map(product => <ProductCard
                            key={product._id}
                            product={product}
                        ></ProductCard>)
                    }
                </div>
                <div className='flex justify-center'>

                    <Link to='/tools'>
                        <button class="btn btn-wide btn-outline btn-primary">
                            <span className='font-bold mr-5 text-xl'>More Purchase</span> <GiArmoredBoomerang className='text-3xl' />
                        </button>
                    </Link>
                </div>
            </div>
            <BussinessSummery></BussinessSummery>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;
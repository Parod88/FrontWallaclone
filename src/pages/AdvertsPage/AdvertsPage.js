import LayoutGeneral from '../../components/LayoutGeneral/LayoutGeneral';
import './AdvertsPage.scss';

import React, { useState } from 'react';
import storage from '../../utils/storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadAdvertsByCategory, loadPaginatedAdverts, loadAdvertsByName } from '../../store/actions';
import { getAdverts, getUi } from '../../store/selectors/selectors';
import { useEffect } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import AdvertCard from '../../components/AdvertCard/AdvertCard';
import FiltersSection from './FiltersSection/FiltersSection';
import NotResultsFound from '../../components/NotResultsFound/NotResultsFound';
import { Toaster, toast } from 'react-hot-toast';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import CustomToaster from '../../components/CustomToaster/CustomToaster';
import { defaultFilters, filterAds } from './service';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 

const getFilters = () => storage.get('filters') || defaultFilters;
const saveFilters = (filters) => storage.set('filters', filters);

function AdvertsPage(value, history, ...props) {

  const location = useLocation();
  const {id} = useParams();
  const route = location.search
  console.log("ROUTE", route)
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  useEffect(() => {
    if (error) {
      toast.error(`${error.message}: ${error.error}`);
    }
  }, [error]);

  //TODO: read params url and load data. Adverts general or categorie
  const [filters, setFilters] = useState(getFilters);
  // //TODO: read params url and load data. Adverts general or categorie

  // //TODO: Limit pagination is a mock data
  const limitPagination = 300;

  useEffect(() => {
    saveFilters(filters);
  }, [filters]);

  useEffect(() => {
    if(!id){
      dispatch(loadPaginatedAdverts());
    } else {
      dispatch(loadAdvertsByCategory(id));
    }
    
  }, [dispatch]);

  const adverts = useSelector(getAdverts);
  const filteredAdverts = filterAds(adverts, filters);

  return (
    <div id="adverts-page">
      <LayoutGeneral {...props}>
        <Breadcrumbs />
        {!isLoading ? (
          <>
            <SectionTitle
              title={'What are you looking for today?'}
              subtitle={'Write an introductory description of the category.'}
            />
            <FiltersSection
              initialFilters={filters}
              defaultFilters={defaultFilters}
              prices={adverts.map(({ price }) => price)}
              onFilter={setFilters}
            />
            <section className="container ">
              <ul className="grid-cards">
                {filteredAdverts.length > 0 ? (
                  filteredAdverts.slice(0, limitPagination).map((advert) => (
                    <li key={advert._id}>
                      <AdvertCard advert={advert} />
                    </li>
                    ))
                ) : (
                  <div>
                    <NotResultsFound />
                  </div>
                )}
              </ul>
            </section>
          </>
        ) : (
          !isLoading && <NotResultsFound />
        )}
        {/*Loading and errors */}
        {isLoading && <LoadingBox />}
        {error && <CustomToaster />}
      </LayoutGeneral>
    </div>
  );
}

export default AdvertsPage;

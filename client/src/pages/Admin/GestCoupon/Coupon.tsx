import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../context/store';
import { fetchAllCoupons } from '../../../context/features/CouponSlice';
import Destroy from '../../../components/Destroy';
import Delete from '../../../components/Delete';
import AddCoupon from './AddCoupon';
import EditCoupon from './EditCoupon';
import ViewCoupon from './ViewCoupon';
import Spinner from '../../../components/Spinner';

const Coupon : React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { coupons } = useSelector((state :RootState) => state.coupons);
  const { isLoading } = useSelector((state: RootState) => state.coupons);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDestroyModalOpen, setIsDestroyModalOpen] = useState(false);
  const [isshowDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
 
  const [Element , setElement] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIds , setSelectedIds] = useState<string[]>([]);;
  const [selectAllChecked, setSelectAllChecked] = useState(false);
 

  // Checkbox handling
  const handleSelectAllChange = (e: { target: { checked: any; }; }) => {
    const isChecked = e.target.checked;
    setSelectAllChecked(isChecked);
    setSelectedIds(isChecked ? coupons.map((Coupon: { _id: any; }) => Coupon._id) : []);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, Id: string) => {
    const isChecked = e.target.checked;
    setSelectedIds((prevSelected: any[]) =>
      isChecked
        ? [...prevSelected, Id]
        : prevSelected.filter((id: any) => id !== Id)
    );
  };

  const formatExpirationDate = (dateString: string): string => {
    const expirationDate = new Date(dateString);
    const day: number = expirationDate.getDate();
    const month: string = expirationDate.toLocaleString('default', { month: 'numeric' });
    const year: number = expirationDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  }

  
  useEffect(()=> {
    dispatch(fetchAllCoupons());
  },[])

  return (
  <div>

    <h1 className="mb-4 font-semibold leading-none tracking-tight text-gray-900 lg:text-6xl dark:text-black">Gestion des Pompistes</h1>

      {
        isLoading ? (
          <Spinner/>
        ) : (
          <section className="p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                  <h5>
                    <span className="text-white">Tous les coupons : </span>
                    <span className="dark:text-white">{coupons.length}</span>
                  </h5>
                </div>
                
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                      </div>
                      <input type="text" id="simple-search" placeholder="Search for products" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none bg-blue-500"
                >
                  <svg className="h-3.5 w-3.5 mr-1.5 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Ajouter
                </button>
      
                  <button
                  type="button"
                  onClick={()=> setIsDestroyModalOpen(true)}
                  id="createProductButton" data-modal-toggle="createProductModal" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none bg-red-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                    Destroy
                  </button>
                
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm  text-gray-500 dark:text-gray-400 text-center  ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                        <input
                                type="checkbox"
                                id="selectAll"
                                checked={selectAllChecked}
                                onChange={handleSelectAllChange}
                              />
                        
                          <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                        </div>
                      </th>
                      <th scope="col" className="p-4 ">Code</th>
                      <th scope="col" className="p-4 ">Reduction</th>
                      <th scope="col" className="p-4 ">Score</th>
                      <th scope="col" className="p-4 ">Disponible</th>
                      <th scope="col" className="p-4 ">date Expiration</th>
                      <th scope="col" className="p-4 ">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {coupons?.map((coupon :any ) => (
                    <tr key={coupon._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 w-4">
                        <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`checkbox${coupon._id}`}
                          name="options[]"
                          value={coupon._id}
                          checked={selectAllChecked || selectedIds.includes(coupon._id)}
                          onChange={(e) => handleCheckboxChange(e, coupon._id)}
                        />
      
                      <label htmlFor={`checkbox-table-search-${coupon._id}`} className="sr-only">
                        Select
                      </label>
      
                        </div>
                      </td>
                      <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center justify-center mr-3">
                          <span>{coupon.code}</span>
                        </div>
                      </th>
                      <td className="px-4 py-3">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium rounded dark:bg-primary-900 dark:text-primary-300">{coupon.reduction}%</span>
                      </td>
                    
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{coupon.score}pts</td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      
                        <div className="flex items-center justify-center flex-row">
                          <span>{coupon.nbrDisponible}</span>
                        </div>
      
                      </td>
      
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{formatExpirationDate(coupon.dateExpiration)}</td>
      
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center justify-center space-x-4">
      
                          <button  onClick={() =>{setElement(coupon) , setIsEditModalOpen(true)}} type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:hover:bg-yellow-600 dark:focus:ring-yellow-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                            </svg>
                          </button>
      
                          <button  onClick={() =>{setElement(coupon) , setIsViewModalOpen(true)}} type="button" data-drawer-target="drawer-read-product-advanced" data-drawer-show="drawer-read-product-advanced" aria-controls="drawer-read-product-advanced" className="py-2 px-2 flex items-center text-sm font-medium text-center text-green-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-green-700 dark:bg-gray-800 dark:text-green-400 dark:border-green-600 dark:hover:text-white dark:hover:bg-green-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4  -ml-0.5">
                              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                              <path fillRule="evenodd" clipRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" />
                            </svg>
                          </button>
                          
                          <button onClick={() =>{setSelectedId(coupon._id) , setIsDeleteModalOpen(true)}}  type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4  -ml-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
      
      
                        </div>
                      </td>
                    </tr>
                  
                  ))}
                  </tbody>
                </table>
              </div>
            
            </div>
          </div>
        </section>
        )
      }

    <Destroy show={isDestroyModalOpen} handleClose={() => setIsDestroyModalOpen(false)} ids={selectedIds} EndPoint="/coupons/destroy" onDestroySuccess={fetchAllCoupons} />
    <Delete show={isshowDeleteModalOpen} handleClose={() => setIsDeleteModalOpen(false)} Id={selectedId} EndPoint="/coupons"  onDeletionSuccess={fetchAllCoupons}/>
    <EditCoupon show={isEditModalOpen} handleClose={() => setIsEditModalOpen(false)} Element={Element} />
    <AddCoupon show={isAddModalOpen} handleClose={() => setIsAddModalOpen(false)} />
    <ViewCoupon show={isViewModalOpen} handleClose={() => setIsViewModalOpen(false)}  Element={Element}/>

  </div>

  )
}

export default Coupon
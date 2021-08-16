import React, { useState, useEffect } from 'react';
import config from 'config';
import { fetchWrapper } from '@/_helpers';
const baseUrl = `${config.apiUrl}`;


function Coupons() {
  const [coupons, setCoupons] = useState();

  useEffect(() => {
    fetchWrapper.get(`${baseUrl}/coupons/get-coupons`).then(x => setCoupons(x));
  }, []);


  return (
    <div>
      {coupons && coupons.map(coupon => {
        return (
          <div style={{ border: '1px solid black', borderRadius: '1px', padding: '10px', margin: '5px' }}>
            <h5>User: {coupon.uuid}</h5>
            <h6>Coupons :</h6>
              {coupon.coupons.map(x => {
                return (
                  <div>
                    <p>{x.store}, {x.code}</p>
                  </div>
                )
              })}
          </div>
        )
      })}
    </div>
  );
}

export default Coupons;
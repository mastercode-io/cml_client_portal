/**
 * Valid8 API Service
 * 
 * This service handles authentication and address lookup functionality
 * using the Valid8 API.
 */

// API configuration
const API_CONFIG = {
  authUrl: 'https://staging-api.valid8.cloud/v1/authentication/token',
  addressLookupUrl: 'https://staging-api.valid8.cloud/v1.1/address/postcode',
  apiKey: 'IxdCoTcsb+hO7q12WOuoWpFgTOugxi6kdA/YHN9vVmk8pqI+18KGj2MC/fRXlZb+So0XPO2MvswJ4WRmWUn5SQ==',
  environment: 'staging'
};

// Token storage
let tokenData = {
  token: null,
  expirationTime: null
};

/**
 * Get authentication token from Valid8 API
 * @returns {Promise<string>} Authentication token
 */
const getAuthToken = async () => {
  // Check if we have a valid token already
  if (tokenData.token && tokenData.expirationTime && new Date() < tokenData.expirationTime) {
    return tokenData.token;
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Valid8API',
      'cache-control': 'no-cache'
    };

    const body = {
      ApiKey: API_CONFIG.apiKey
    };

    const response = await fetch(API_CONFIG.authUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const token = data.result.token;

    // Store token with expiration time (29 minutes from now)
    tokenData.token = token;
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 29);
    tokenData.expirationTime = expirationTime;

    return token;
  } catch (error) {
    console.error('Error getting authentication token:', error);
    throw error;
  }
};

/**
 * Look up addresses by postal code
 * @param {string} postcode - The postal code to look up
 * @returns {Promise<Array>} List of addresses
 */
const postcodeAddressLookup = async (postcode) => {
  try {
    // Get auth token
    const token = await getAuthToken();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Valid8API',
      'cache-control': 'no-cache',
      'Authorization': `bearer ${token}`
    };

    const body = {
      postcode: postcode
    };

    const response = await fetch(API_CONFIG.addressLookupUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Address lookup failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error('Error looking up addresses:', error);
    throw error;
  }
};

/**
 * Format addresses from Valid8 API response
 * @param {Array} addressList - List of addresses from Valid8 API
 * @returns {Array} Formatted address options for dropdown
 */
const formatAddressOptions = (addressList) => {
  if (!addressList || !Array.isArray(addressList) || addressList.length === 0) {
    return [{ value: '', label: 'No addresses found' }];
  }

  const options = [{ value: '', label: 'Select address' }];

  addressList.forEach(address => {
    let addressLine = address.buildingNumber ? address.buildingNumber : address.buildingName;
    addressLine = addressLine + " " + address.thoroughfare;
    addressLine = addressLine + (address.locality ? ", " + address.locality : "");
    addressLine = addressLine + (address.postTown ? ", " + address.postTown : "");
    addressLine = addressLine + (address.county ? ", " + address.county : "");
    addressLine = addressLine + (address.country ? ", " + address.country : "");

    options.push({
      value: addressLine,
      label: addressLine,
      metadata: {
        houseNumber: address.buildingNumber,
        houseName: address.buildingName
      }
    });
  });

  return options;
};

export default {
  getAuthToken,
  postcodeAddressLookup,
  formatAddressOptions
};

import React from 'react';

function useLocalStorage(itemName, initialValue){                            // Usando la convención al empezar el nombre con 'use' definimos que esto es un "Custom Hook"
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  
  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
        setLoading(false);
      } catch(error) {
        setLoading(false);
        setError(true);
      }
    }, 500)
  }, []);

  
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem))
    setItem(newItem)
  };

  console.log(item);
  
  return {
    item, 
    saveItem,
    loading,
    error 
  };
}

export { useLocalStorage };
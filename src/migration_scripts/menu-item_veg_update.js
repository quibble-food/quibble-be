const axios = require('axios');

async function updateVegField() {
  try {
    const apiUrl = 'http://localhost:1337'; // Replace with your Strapi API URL
    const authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjgzNjYxNzU0LCJleHAiOjE2ODYyNTM3NTR9._VFvhuOD7lplt3UI7iiSta7rQq2w919ww4u-UNsWGQ0'; // Replace with your actual authentication token

    const menuItemsResponse = await axios.get(`${apiUrl}/api/menu-items?populate[0]=addons&populate[1]=addons.addon_item`, {
      headers: {
        Authorization: authHeader,
      },
    });
    const menuItems = menuItemsResponse.data.data;

    const updatedMenuItems = menuItems.map((menuItem) => {
      const updatedAddons = menuItem.attributes.addons.map((addon) => {
        const updatedAddonItems = addon.addon_item.map((item) => {
          if (item.veg === null) {
            return { ...item, veg: true }; // Set the desired value for the "veg" field
          }
          return item;
        });

        return { ...addon, addon_item: updatedAddonItems };
      });

      return { ...menuItem, addons: updatedAddons };
    });

    await axios.put(`${apiUrl}/api/menu-items`, updatedMenuItems, {
      headers: {
        Authorization: authHeader,
      },
    });

    console.log('Menu-items updated successfully.');
  } catch (error) {
    console.error('Error updating menu-items:', error);
  }
}

// Call the function to update the "veg" field in the database
updateVegField();




// async function updateVegField() {
//     try {
//         const menuItems = await strapi.query('menu-item', 'menu-item').find();
//         console.log(menuItems)
//         const updatedMenuItems = [];
  
//         for (const menuItem of menuItems) {
//           for (const addon of menuItem.addons) {
//             for (const item of addon.addon_item) {
//               if (item.veg === null) {
//                 item.veg = true; // Set the desired value for the "veg" field
//               }
//             }
//           }
  
//           updatedMenuItems.push(menuItem);
//         }
  
//         await strapi.query('menu-item', 'menu-item').updateMany({}, updatedMenuItems);
  
//       console.log('Menu-items updated successfully.');
//     } catch (error) {
//       console.error('Error updating menu-items:', error);
//     }
//   }
  
//   // Call the function to update the "veg" field in the database
//   updateVegField();
  
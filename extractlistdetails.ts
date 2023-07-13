import { sp } from '@pnp/sp/presets/all';

// Configure SharePoint context
sp.setup({
  sp: {
    baseUrl: 'https://rtuacin.sharepoint.com/sites/shivang'
  }
});

// Specify the SharePoint list title
const listTitle = 'Alco';

// Extract list details from SharePoint
export const extractListDetails = async () => {
  try {
    const list = sp.web.lists.getByTitle(listTitle);

    // Retrieve all list items
    const items = await list.items.getAll();

    // Return the list items
    return items;
  } catch (error) {
    console.log(`Error extracting list details: ${error}`);
    return [];
  }
};

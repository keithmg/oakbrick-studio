import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'u0kekd4i',
  dataset: 'production',
  apiVersion: '2024-03-03',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN
});

async function updateProperty() {
  console.log('Updating Norton Ave property...\n');

  try {
    // Fetch the property first
    const property = await client.fetch('*[_type == "property" && title == "Norton Ave"][0]{_id, title}');

    if (!property) {
      console.error('Norton Ave property not found!');
      return;
    }

    console.log(`Found property: ${property.title} (ID: ${property._id})`);

    // Update with rental information
    const updates = {
      monthlyRent: 1450,
      status: 'available',
      securityDeposit: 1450,  // Typically 1 month rent
      leaseTerm: '1-year',
      petPolicy: 'case-by-case',
      utilitiesIncluded: ['water', 'trash']
    };

    console.log('\nApplying updates:');
    console.log(`  Monthly Rent: $${updates.monthlyRent}/month`);
    console.log(`  Status: ${updates.status}`);
    console.log(`  Security Deposit: $${updates.securityDeposit}`);
    console.log(`  Lease Term: ${updates.leaseTerm}`);
    console.log(`  Pet Policy: ${updates.petPolicy}`);
    console.log(`  Utilities Included: ${updates.utilitiesIncluded.join(', ')}`);

    const result = await client
      .patch(property._id)
      .set(updates)
      .commit();

    console.log('\n✓ Successfully updated Norton Ave property!');
    console.log(`\nYou can now view it at: https://oakbrickproperties.com/properties/norton-ave`);

  } catch (error) {
    console.error('\n✗ Update failed:', error.message);
    console.log('\nYou may need to update this manually in Sanity Studio.');
  }
}

updateProperty();

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'u0kekd4i',
  dataset: 'production',
  apiVersion: '2024-03-03',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN
});

async function migrateProperties() {
  console.log('Fetching current properties...');

  const properties = await client.fetch('*[_type == "property"]{_id, title, status, price, monthlyRent}');

  console.log(`Found ${properties.length} properties:\n`);
  properties.forEach((prop, idx) => {
    console.log(`${idx + 1}. ${prop.title}`);
    console.log(`   Current status: ${prop.status}`);
    console.log(`   Price field: ${prop.price}`);
    console.log(`   MonthlyRent field: ${prop.monthlyRent}`);
    console.log('');
  });

  console.log('Starting migration...\n');

  for (const property of properties) {
    const updates = {};
    let needsUpdate = false;

    // Migrate price to monthlyRent if needed
    if (property.price && !property.monthlyRent) {
      updates.monthlyRent = property.price;
      needsUpdate = true;
      console.log(`${property.title}: Setting monthlyRent to ${property.price}`);
    }

    // Update status
    const statusMap = {
      'for-sale': 'available',
      'sold': 'rented',
      'pending': 'pending'
    };

    if (statusMap[property.status]) {
      const newStatus = statusMap[property.status];
      if (property.status !== newStatus) {
        updates.status = newStatus;
        needsUpdate = true;
        console.log(`${property.title}: Updating status from '${property.status}' to '${newStatus}'`);
      }
    }

    // Apply updates
    if (needsUpdate) {
      try {
        await client
          .patch(property._id)
          .set(updates)
          .commit();
        console.log(`✓ Updated ${property.title}`);
      } catch (error) {
        console.error(`✗ Failed to update ${property.title}:`, error.message);
      }
    } else {
      console.log(`- No updates needed for ${property.title}`);
    }
    console.log('');
  }

  console.log('\nMigration complete!');
  console.log('\nIMPORTANT: You still need to manually add in Sanity Studio:');
  console.log('  - Security Deposit');
  console.log('  - Lease Term');
  console.log('  - Pet Policy');
  console.log('  - Utilities Included');
}

migrateProperties().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});

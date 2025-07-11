import 'dotenv/config'
import CodifySchema from '../src/schemastore/codify-schema.json' with {type: 'json'}
import {createClient} from "@supabase/supabase-js";

/**
 * This is an upload script to upload new resources. Update the codify-schema.json file and
 * run this script. Since it's a worker you'll need to open up the URL before it runs.
 */

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

async function main() {
  console.log('Adding default plugin');
  const defaultPlugin = await client.from('registry_plugins').upsert({
    name: 'default',
  }, {onConflict: 'name'})
    .select();

  const { id: pluginId, name: pluginName } = defaultPlugin.data![0];
  const resources = CodifySchema.items.oneOf;

  for (const resource of resources) {
    const type = resource.properties.type.const;

    console.log(`Adding resource ${type}`)
    const resourceRow = await client.from('registry_resources').upsert({
      type,
      plugin_id: pluginId,
      plugin_name: pluginName,
      schema: JSON.stringify(resource),
    }, {onConflict: ['type', 'plugin_id']})
      .select();

    const { id: resourceId } = resourceRow.data![0];

    console.log(`Adding parameters for resource ${type}`)
    const parameters = Object.entries(resource.properties)
      .filter(([k]) => k !== 'type')
      .map(([key, property]) => ({
        type: property.type,
        name: key,
        resource_id: resourceId,
        schema: JSON.stringify(property),
      }))

    await client.from('registry_resource_parameters').upsert(parameters, {onConflict: ['name', 'resource_id']});
  }

  return new Response('Upload complete');
}

main();

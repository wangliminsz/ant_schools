import axios from "axios";
import airtable from 'airtable';

// export class ContactService {
// GPT
export const ContactService = {
  serverSupaURL: "https://phgwjhhylafzchotgoay.supabase.co/rest/v1",
  supa_key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZ3dqaGh5bGFmemNob3Rnb2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODUwNzAxMjksImV4cCI6MjAwMDY0NjEyOX0.2lOoBm8ElUM87ACf4zXZTfwoBJdqc84VPdtABvhx4Nc",

  // wonderful.2023 -- data_for_prg -- school basic data
  serverAirURL: "https://api.airtable.com/v0/appJJW4cNg7colfZp",
  air_token: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",

  // wonderful.2023 -- pattaya_db -- pattaya school basic data
  serverAirURL_pattaya: "https://api.airtable.com/v0/appb8GiyPtKOqdUp4",
  air_token_pattaya: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",

  // // wonderful.2023 -- data_imgs -- school imgs
  // serverAirURL_img: 'https://api.airtable.com/v0/appJJW4cNg7colfZp',
  // air_token_img: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",
  // 2023-12-17, 換了 base
  // appzO8PMdXgWMh2kH Bangkok Imgs
  serverAirURL_img: 'https://api.airtable.com/v0/appzO8PMdXgWMh2kH',
  air_token_img: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",
  // pattaya Imgs
  serverAirURL_img_pattaya: 'https://api.airtable.com/v0/appb8GiyPtKOqdUp4',
  air_token_img_pattaya: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",

  // wonderful.2023 -- html -- school html
  serverAirURL_html: 'https://api.airtable.com/v0/appymVddi9kCK7YVf',
  // table id // tbli04jtjRXpmcRuD
  air_token_html: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",

  // 2023-12-17
  serverAirURL_html_pattaya: 'https://api.airtable.com/v0/appymVddi9kCK7YVf',
  air_token_html_pattaya: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",


  // wonderful.2023 -- michelin -- basic info
  serverMichelin: 'https://api.airtable.com/v0/appMjyV0O9VIUtd1b',
  air_token_michelin: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",

  // wonderful.2023 -- michelin -- img_1 
  serverMichelin_img_1: 'https://api.airtable.com/v0/appDWnRQyFQyQMch8',
  air_token_m_img_1: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",

  // wonderful.2023 -- michelin -- html 
  serverMichelin_html: 'https://api.airtable.com/v0/appRiUcz8vKeb4Hhw',
  air_token_m_html: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // async getMichelin() {

  //   let dataURL = `${this.serverMichelin}/basic_info`;

  //   let headers = {
  //     'Content-Type': 'application/json', // Example header
  //     'Authorization': `Bearer ${this.air_token_michelin}`
  //   };

  //   return axios.get(dataURL, { headers: headers });
  // },

  async getMichelin() {
    let dataURL = `${this.serverMichelin}/basic_info`;
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.air_token_michelin}`
    };

    let allRecords = [];
    let offset = null;
    let shouldContinue = true;

    while (shouldContinue) {
      const response = await axios.get(dataURL, {
        headers: headers,
        params: { offset: offset } // Include the offset parameter
      });

      const records = response.data.records;
      allRecords.push(...records);

      if (response.data.offset) {
        offset = response.data.offset; // Get the next offset from the response
      } else {
        shouldContinue = false; // Stop the loop if there is no next offset
      }
    }

    return allRecords;
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  async getMichelinSpec(contactId) {

    let dataURL = `${this.serverMichelin}/basic_info?filterByFormula=({id}=${contactId})`

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_michelin}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~

  async getMichelinHtml(contactId) {

    let dataURL = `${this.serverMichelin_html}/m_html?filterByFormula=({link_id}=${contactId})`

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_m_html}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  async airUpdateMichelinHtml(recordObj, contactId) {
    return new Promise((resolve, reject) => {
      // configure the Airtable base and API key
      airtable.configure({
        apiKey: `${this.air_token_m_html}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to update the record in
      const base = airtable.base('appRiUcz8vKeb4Hhw');
      const table = base('tblKP1cJrjSFSON9K');  // m_html

      let htmlObj = { fields: recordObj }

      table.select({ filterByFormula: `{link_id} = ${contactId}` }).firstPage((err, records) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (records.length > 0) {
          const record = records[0];
          const airId = record.id;

          // delete fields that are not editable
          // delete recordObj.fields.id;
          // delete recordObj.fields.created_at;

          // update the record in Airtable
          table.update(airId, htmlObj.fields, (err, record) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            // console.log(`Airtable record ID for ID ${contactId} is ${record.id}`);
            console.log(`Michelin html record ID for ID ${contactId} is ${record.id}`);
            resolve(record.id);
          });
        } else {
          // 没有记录，插入记录值 html

          // insert the record into the Airtable table
          table.create(recordObj, { typecast: true }, (err, newRecord) => {
            if (err) {
              console.error('create Html error -->>', err);
              reject(err);
              return;
            }

            console.log(`Michelin New record created with ID ${newRecord.id}`);
            resolve(newRecord.id);
          });

          // console.log(`No record found with ID ${contactId}`);
          // resolve(null);
        }
      });
    });
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // airInsertMichelinImg

  async airInsertMichelinImg(recordObjArray) {

    // configure the Airtable base and API key
    airtable.configure({
      apiKey: `${this.air_token_m_img_1}`,
      endpointUrl: 'https://api.airtable.com'
    });

    // select the Airtable base and table you want to insert the record into
    const base = airtable.base('appDWnRQyFQyQMch8');
    const table = base('tblLxWohFSjQ55eUS'); //imgs_list

    const promises = [];

    for (const recordObj of recordObjArray) {
      promises.push(new Promise((resolve, reject) => {
        table.create(recordObj, { typecast: true }, (err, newRecord) => {
          if (err) {
            console.error(err);
            // Handle the error appropriately
            return reject(err);
          }

          console.log(`New record created with ID ${newRecord.id}`);
          // Perform actions with the new record

          resolve(newRecord);
        });
      }));
    }

    return Promise.all(promises);
  },


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  async getSchool() {

    let dataURL = `${this.serverAirURL}/data_for_prg`;

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  async getSchool_pattaya() {

    let dataURL = `${this.serverAirURL_pattaya}/pattaya_db`;

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_pattaya}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  async getSchoolSpec(contactId) {

    let dataURL = `${this.serverAirURL}/data_for_prg?filterByFormula=({id}=${contactId})`

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  async getSchoolSpec_pattaya(contactId) {

    let dataURL = `${this.serverAirURL_pattaya}/pattaya_db?filterByFormula=({id}=${contactId})`

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_pattaya}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  async getSchoolHtml(contactId) {

    let dataURL = `${this.serverAirURL_html}/school_2023?filterByFormula=({link_id}=${contactId})`

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_html}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  async getSchoolHtml_pattaya(contactId) {

    let dataURL = `${this.serverAirURL_html_pattaya}/school_2023_pattaya?filterByFormula=({link_id}=${contactId})`

    let headers = {
      'Content-Type': 'application/json', // Example header
      'Authorization': `Bearer ${this.air_token_html_pattaya}`
    };

    return axios.get(dataURL, { headers: headers });
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // by chatGPT
  // serverAirURL: "https://api.airtable.com/v0/appJJW4cNg7colfZp",
  // air_token: "patqeUrC7eLbBBjx5.3fa0ab9407f2512416c9ae44562fa2a83c5c4231022022c745b418e940e79667",

  async airUpdateRecord(recordObj, contactId) {
    return new Promise((resolve, reject) => {
      // configure the Airtable base and API key
      airtable.configure({
        apiKey: `${this.air_token}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to update the record in
      const base = airtable.base('appJJW4cNg7colfZp');
      const table = base('tblStpaHi4l3BTB6f');

      table.select({ filterByFormula: `{id} = ${contactId}` }).firstPage((err, records) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (records.length > 0) {
          const record = records[0];
          const airId = record.id;

          // delete fields that are not editable
          delete recordObj.fields.id;
          delete recordObj.fields.created_at;

          // update the record in Airtable
          table.update(airId, recordObj.fields, (err, record) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            console.log(`Airtable record ID for ID ${contactId} is ${record.id}`);
            resolve(record.id);
          });
        } else {
          console.log(`No record found with ID ${contactId}`);
          resolve(null);
        }
      });
    });
  },

  async airUpdateRecord_pattaya(recordObj, contactId) {
    return new Promise((resolve, reject) => {
      // configure the Airtable base and API key
      airtable.configure({
        apiKey: `${this.air_token_pattaya}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to update the record in
      const base = airtable.base('appb8GiyPtKOqdUp4');
      const table = base('tblMqq1gGgV9AwgR3');

      table.select({ filterByFormula: `{id} = ${contactId}` }).firstPage((err, records) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (records.length > 0) {
          const record = records[0];
          const airId = record.id;

          // delete fields that are not editable
          delete recordObj.fields.id;
          delete recordObj.fields.created_at;

          // update the record in Airtable
          table.update(airId, recordObj.fields, (err, record) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            console.log(`Airtable record ID for ID ${contactId} is ${record.id}`);
            resolve(record.id);
          });
        } else {
          console.log(`No record found with ID ${contactId}`);
          resolve(null);
        }
      });
    });
  },


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  async airUpdateHtml(recordObj, contactId) {
    return new Promise((resolve, reject) => {
      // configure the Airtable base and API key
      airtable.configure({
        apiKey: `${this.air_token_html}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to update the record in
      const base = airtable.base('appymVddi9kCK7YVf');
      const table = base('tbli04jtjRXpmcRuD');  // html

      let htmlObj = { fields: recordObj }

      table.select({ filterByFormula: `{link_id} = ${contactId}` }).firstPage((err, records) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (records.length > 0) {
          const record = records[0];
          const airId = record.id;

          // delete fields that are not editable
          // delete recordObj.fields.id;
          // delete recordObj.fields.created_at;

          // update the record in Airtable
          table.update(airId, htmlObj.fields, (err, record) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            // console.log(`Airtable record ID for ID ${contactId} is ${record.id}`);
            console.log(`Airtable html record ID for ID ${contactId} is ${record.id}`);
            resolve(record.id);
          });
        } else {
          // 没有记录，插入记录值 html

          // insert the record into the Airtable table
          table.create(recordObj, { typecast: true }, (err, newRecord) => {
            if (err) {
              console.error('create Html error -->>', err);
              reject(err);
              return;
            }

            console.log(`New record created with ID ${newRecord.id}`);
            resolve(newRecord.id);
          });

          // console.log(`No record found with ID ${contactId}`);
          // resolve(null);
        }
      });
    });
  },

  async airUpdateHtml_pattaya(recordObj, contactId) {
    return new Promise((resolve, reject) => {
      // configure the Airtable base and API key
      airtable.configure({
        apiKey: `${this.air_token_html}`,
        endpointUrl: 'https://api.airtable.com'
      });

      // select the Airtable base and table you want to update the record in
      const base = airtable.base('appymVddi9kCK7YVf');
      const table = base('tblQt5irT1nVhUgqY');  // html

      let htmlObj = { fields: recordObj }

      table.select({ filterByFormula: `{link_id} = ${contactId}` }).firstPage((err, records) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (records.length > 0) {
          const record = records[0];
          const airId = record.id;

          // delete fields that are not editable
          // delete recordObj.fields.id;
          // delete recordObj.fields.created_at;

          // update the record in Airtable
          table.update(airId, htmlObj.fields, (err, record) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }

            // console.log(`Airtable record ID for ID ${contactId} is ${record.id}`);
            console.log(`Airtable html record ID for ID ${contactId} is ${record.id}`);
            resolve(record.id);
          });
        } else {
          // 没有记录，插入记录值 html

          // insert the record into the Airtable table
          table.create(recordObj, { typecast: true }, (err, newRecord) => {
            if (err) {
              console.error('create Html error -->>', err);
              reject(err);
              return;
            }

            console.log(`New record created with ID ${newRecord.id}`);
            resolve(newRecord.id);
          });

          // console.log(`No record found with ID ${contactId}`);
          // resolve(null);
        }
      });
    });
  },

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // // airInsertRecord
  // // by chatGPT ver1.0 -- 2023/09/14 可以插入数据，没有返回 Promise

  // async airInsertRecord(recordObjArray) {
  //   return new Promise((resolve, reject) => {
  //     // configure the Airtable base and API key
  //     airtable.configure({
  //       apiKey: `${this.air_token_img}`,
  //       endpointUrl: 'https://api.airtable.com'
  //     });

  //     // select the Airtable base and table you want to insert the record into
  //     const base = airtable.base('appJJW4cNg7colfZp');
  //     const table = base('tblxZzkjwuR8Q1itk'); //data_imgs tbl4LsW2rdIXD3AhN

  //     let recordObj = {}

  //     for (const recordObj of recordObjArray) {
  //       table.create(recordObj, { typecast: true }, (err, newRecord) => {
  //         if (err) {
  //           console.error(err);
  //           // Handle the error appropriately
  //           // reject(err);
  //           return;
  //         }

  //         console.log(`New record created with ID ${newRecord.id}`);
  //         // Perform actions with the new record
  //       });
  //       // resolve(?what should I write here);
  //     }
  //   }); 
  // }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~   

  // // airInsertRecord
  // // by chatGPT ver2.0 -- 2023/09/15 可以插入数据，返回 Promises

  async airInsertRecord(recordObjArray) {

    // configure the Airtable base and API key
    airtable.configure({
      apiKey: `${this.air_token_img}`,
      endpointUrl: 'https://api.airtable.com'
    });

    // // select the Airtable base and table you want to insert the record into
    // const base = airtable.base('appJJW4cNg7colfZp');
    // const table = base('tblxZzkjwuR8Q1itk'); //data_imgs tbl4LsW2rdIXD3AhN
    // 2023-12-17 換了 base
    const base = airtable.base('appzO8PMdXgWMh2kH');
    const table = base('tblWj5NcvIRppwbS2'); //data_imgs tbl4LsW2rdIXD3AhN

    const promises = [];

    for (const recordObj of recordObjArray) {
      promises.push(new Promise((resolve, reject) => {
        table.create(recordObj, { typecast: true }, (err, newRecord) => {
          if (err) {
            console.error(err);
            // Handle the error appropriately
            return reject(err);
          }

          console.log(`New record created with ID ${newRecord.id}`);
          // Perform actions with the new record

          resolve(newRecord);
        });
      }));
    }

    return Promise.all(promises);
  },

  async airInsertRecord_pattaya(recordObjArray) {

    // configure the Airtable base and API key
    airtable.configure({
      apiKey: `${this.air_token_img_pattaya}`,
      endpointUrl: 'https://api.airtable.com'
    });

    // // select the Airtable base and table you want to insert the record into
    // const base = airtable.base('appJJW4cNg7colfZp');
    // const table = base('tblxZzkjwuR8Q1itk'); //data_imgs tbl4LsW2rdIXD3AhN
    // 2023-12-17 換了 base
    const base = airtable.base('appb8GiyPtKOqdUp4');
    const table = base('tblGZGH9mB0KBUU5b'); //pattaya_imgs

    const promises = [];

    for (const recordObj of recordObjArray) {
      promises.push(new Promise((resolve, reject) => {
        table.create(recordObj, { typecast: true }, (err, newRecord) => {
          if (err) {
            console.error(err);
            // Handle the error appropriately
            return reject(err);
          }

          console.log(`New record created with ID ${newRecord.id}`);
          // Perform actions with the new record

          resolve(newRecord);
        });
      }));
    }

    return Promise.all(promises);
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

}
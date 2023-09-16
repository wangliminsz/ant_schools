<template>

  <!-- Spinner -->
  <div v-if="loading">
    <div class="container">
      <div class="row">
        <div class="col">
          <mySpinner />
        </div>
      </div>
    </div>
  </div>

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!-- Error Message -->
  <div v-if="!loading && errorMessage">
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h5 text-danger fw-bold">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <div v-if="!loading">
    <div class="mt-3 ml-5">
      <p style="font-size: 20px;">{{ contact.fields.school_name }}</p>
    </div>
  </div>

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <div class="mt-3 ml-5" v-if="!loading">
    <div class="flex flex-col md:flex-row">
      <div class="mr-4">

        <form @submit.prevent="myUpdate">

          <div class="mt-5 mb-2" v-if="contact && contact.fields">

            <input v-model="contact.fields.grade" type="text" class="form-input w-96 h-8" placeholder="年级设置" />

          </div>

          <div class="mt-5 mb-2" v-if="contact && contact.fields">

            <input v-model="contact.fields.school_fee" type="text" class="form-input w-96 h-8" placeholder="学费设置" />

          </div>

          <div class="mt-5 mb-2" v-if="contact && contact.fields">

            <div class="mb-2">
            <label class="text-sm">是否寄宿</label>
            </div>
            <select v-model="contact.fields.if_boarding" class="form-select w-96 h-8">
              <option value="Yes">是</option>
              <option value="No">否</option>
            </select>

          </div>

          <div class="mt-5 mb-2" v-if="contact && contact.fields">

            <input v-model="contact.fields.memo" type="text" class="form-input w-96 h-8" placeholder="备注" />

          </div>

          <!-- <div class="flex mt-8 items-center">
            <div>
              <input type="submit" class="px-4 py-2 rounded-lg bg-green-500 text-white text-base w-24" value="更新"
                :disabled="!isFormValid" />
            </div>
            <div class="ml-5">
              <router-link to="/schooltable"
                class="px-4 py-2 rounded-lg bg-gray-500 text-white text-base w-24 inline-block">取消</router-link>
            </div>
          </div> -->

          <div class="flex mt-8 items-center">

            <div>
              <input type="submit" class="px-4 py-2 rounded-lg bg-green-500 text-white text-base w-24" value="更新" />
            </div>

            <div class="ml-5">
              <!-- <router-link to="/schooltable" class="px-4 py-2 rounded-lg bg-gray-500 text-white text-base w-24">取消</router-link> -->
              <input type="button" class="px-4 py-2 rounded-lg bg-gray-500 text-white text-base w-24" value="取消"
                @click="backSchool" />
            </div>

          </div>

        </form>

      </div>
    </div>
  </div>

  <!-- <pre> {{  contact }}</pre> -->

</template>  

<script>
import { ContactService } from "@/services/ContactService";
import mySpinner from "@/components/Spinner.vue";

import { supabase } from "@/clients/supabase";

export default {
  name: "EditContact",

  components: {
    mySpinner,
  },

  data() {
    return {
      contactId: this.$route.params.contactId,
      contact: {},

      errorMessage: "",
      loading: false,

      currentUserId: "",
    };
  },

  created: async function () {
    this.loading = true;
    this.currentUserId = await this.currentUser();

    if (this.currentUserId) {
      try {
        this.loading = true;
        let response = await ContactService.getSchoolSpec(
          this.contactId
        );
        if (response) {
          this.contact = response.data.records[0];
          console.log('from schoolEdit --->>>', this.contact)

          this.loading = false;
        }
      } catch (error) {
        this.errorMessage = error;
        this.loading = false;
      }
    }
  },

  // computed: {
  //   // isValidName() {
  //   //     return Boolean(this.contact.fields.name);
  //   // },
  //   isValidName() {
  //     return (
  //       this.contact &&
  //       this.contact.fields &&
  //       this.contact.fields.name !== undefined &&
  //       this.contact.fields.name !== ""
  //     );
  //   },
  //   isValidAddress() {
  //     return true;
  //   },
  //   isValidRemindDay() {
  //     const remindDay = Number(this.contact.fields.remind_day);
  //     return !isNaN(remindDay) && remindDay >= 1 && remindDay <= 31;
  //   },

  //   isValidRentStart() {
  //     const dateStr = this.contact.fields.rent_start;
  //     const dateObj = new Date(dateStr);
  //     return dateObj instanceof Date && !isNaN(dateObj);
  //   },
  //   isValidRentEnd() {
  //     const dateStr = this.contact.fields.rent_end;
  //     const dateObj = new Date(dateStr);
  //     return dateObj instanceof Date && !isNaN(dateObj);
  //   },

  //   isValidNotifyToken() {
  //     return true;
  //   },

  //   isValidMemo() {
  //     return true;
  //   },

  //   // isValidGroup() {
  //   //     return Boolean(this.contact.fields.groupId);
  //   // },

  //   isFormValid() {
  //     return (
  //       this.isValidName &&
  //       // this.isValidAddress &&
  //       this.isValidRemindDay &&
  //       this.isValidRentStart &&
  //       this.isValidRentEnd
  //       // this.isValidGroup
  //     );
  //   },
  // },

  methods: {

    backSchool() {
      this.$router.push('/schooltable');
    },

    async currentUser() {
      const localUser = await supabase.auth.getSession();
      if (localUser.data.session) {
        return localUser.data.session.user.id;
      } else {
        console.log("not signin");
      }
    },

    async myUpdate() {
      this.loading = true;
      this.currentUserId = await this.currentUser();

      if (this.currentUserId) {
        try {

          console.log("from edit page ---->", this.contact);

          let response = await ContactService.airUpdateRecord(
            this.contact,
            this.contactId
          );

          console.log("gpt from edit page response ---->", response);

          if (response) {
            this.loading = false;
            // console.log("ok---------> Updated");
            // this.$router.push('/')
            const currentRoute = this.$router.currentRoute;
            if (currentRoute.path !== "/") {
              this.$router.push("/"); // Navigate to the page
            }
          } else {
            this.loading = false;
            const currentRoute = this.$router.currentRoute;
            if (currentRoute.path !== `/schooltable/edit/${this.contactId}`) {
              this.$router.push(`/schooltable/edit/${this.contactId}`); // Navigate to the page
            }
          }
        } catch (error) {
          this.errorMessage = error;
          // console.log(this.errorMessage);
          this.loading = false;
        }
      }
    },

  },
};
</script>

<style scoped>
.d-flex {
  justify-content: space-start;
  /* Adjust this value as needed */
}

.d-flex>div {
  flex-basis: 30%;
  /* Adjust this value as needed */
  /* padding: 0 -1px; */
  /* Adjust this value as needed */
}

/* .form-control .vdp-datepicker .vdp-wrapper {
    border: none;
    box-shadow: none;
} */

.vdp-wrapper {
  border: none !important;
  box-shadow: none !important;
}

.no_border {
  background-color: #ffffff;
  border: none !important;
  box-shadow: none !important;
}

.hide {
  display: none;
  border: none !important;
}
</style>
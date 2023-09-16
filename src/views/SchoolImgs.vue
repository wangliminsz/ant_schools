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

    <div class="mt-5 ml-5 mr-10" v-if="!loading">

            <form @submit.prevent="myAddImgs">

                <div class="mt-5 mb-2" v-if="contact && contact.fields">

                    <!-- v-model="contact_img.fields.grade" -->
                    <!-- <label for="the_images" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add
                        Images</label> -->
                    <textarea id="the_images" rows="20" v-model="urlsTextArea"
                        class="w-full custom-textarea block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="加入图片链接，每张图片一行"></textarea>

                </div>

                <div class="flex mt-5 items-center">

                    <div>
                        <input type="submit" class="px-4 py-2 rounded-lg bg-green-500 text-white text-base w-24"
                            value="Add" />
                    </div>

                    <div class="ml-5">
                        <!-- <router-link to="/schooltable" class="px-4 py-2 rounded-lg bg-gray-500 text-white text-base w-24">取消</router-link> -->
                        <input type="button" class="px-4 py-2 rounded-lg bg-gray-500 text-white text-base w-24" value="取消"
                            @click="backSchool" />
                    </div>

                </div>

            </form>

    </div>

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
</template>
  
<script>
import { ContactService } from "@/services/ContactService";
import { supabase } from "@/clients/supabase";
import mySpinner from "@/components/Spinner.vue";

export default {
    name: "AddSchoolImgs",

    components: {
        mySpinner,
    },

    data() {
        return {
            contactId: this.$route.params.contactId,
            contact: {},
            contact_img: {},
            contact_img_array: [],

            urlsTextArea: '',

            currentUserId: "",
            groups: [],

            errorMessage: "",
            loading: false,

            showDatePicker: false,
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
                    // console.log('from schoolImgs --->>>', this.contact)

                    this.loading = false;
                }
            } catch (error) {
                this.errorMessage = error;
                this.loading = false;
            }
        }
    },

    mounted() {

    },

    computed: {

    },

    methods: {

        backSchool() {
            this.$router.push('/schooltable');
        },

        async myAddImgs() {
            this.loading = true;
            this.currentUserId = await this.currentUser();

            if (this.currentUserId) {

                this.contact_img.link_id = this.contactId
                this.contact_img.Img_school_name = this.contact.fields.school_name

                // const urlsTextArea = document.getElementById('the_images');

                // ver 1.0
                // const urls = this.urlsTextArea.split('\n');

                // ver 2.0 消除空行， 2023-09-15
                const urls = this.urlsTextArea
                    .split('\n')
                    .filter(url => url.trim() !== '');

                // console.log(urls)

                const urlObjects = urls.map(Img_url_imgur => ({ Img_url_imgur, link_id: this.contactId, Img_school_name: this.contact.fields.school_name }));
                // console.log(urlObjects)

                try {

                    // let response = await ContactService.createContact(this.contact)
                    let response = await ContactService.airInsertRecord(urlObjects);
                    console.log("GPT air add Imgs response------------>", response);

                    if (response) {
                        // console.log("ok---------> Created");
                        this.loading = false;

                        // // this.$router.push('/schoolimgs/add/:contactId')
                        // const currentRoute = this.$router.currentRoute;
                        // if (currentRoute.path !== `/schoolimgs/add/${this.contactId}`) {
                        //     this.$router.push(`/schoolimgs/add/${this.contactId}`); // Navigate to the page
                        // }

                        // this.$router.push('/')
                        const currentRoute = this.$router.currentRoute;
                        if (currentRoute.path !== "/") {
                            this.$router.push("/"); // Navigate to the page
                        }

                    } else {
                        this.loading = false;
                        // this.$router.push('/schoolimgs/add/:contactId')
                        const currentRoute = this.$router.currentRoute;
                        if (currentRoute.path !== `/schoolimgs/add/${this.contactId}`) {
                            this.$router.push(`/schoolimgs/add/${this.contactId}`); // Navigate to the page
                        }
                    }
                } catch (error) {
                    this.errorMessage = error;
                    // console.log(this.errorMessage);
                    this.loading = false;
                }
            }
        },

        async currentUser() {
            const localUser = await supabase.auth.getSession();
            if (localUser.data.session) {
                return localUser.data.session.user.id;
            } else {
                console.log("not signin");
            }
        },
    },
};
</script>
  
<style scoped>
@media (min-width: 600px) {
    .custom-textarea {
        width: 50% !important;
    }
}

/* @media (max-width: 960px) {
    .custom-textarea {
        width: full !important;

    }
} */

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
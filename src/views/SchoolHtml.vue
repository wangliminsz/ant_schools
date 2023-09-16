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

        <div class="flex items-center justify-start baseline">

            <div class="mt-3 ml-5">
                <p style="font-size: 20px;">{{ contact.fields.school_name }}</p>
            </div>

            <div class="mt-3 ml-20">
                <a href="https://onlinehtmleditor.dev/" class="text-indigo-600 hover:text-indigo-500">Online Html Editor</a>
            </div>

            <!-- <div class="mt-3 ml-20 text-sm text-indigo-200">
                style="line-height: 180%;"
            </div> -->

        </div>

    </div>

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

    <div class="mt-5 ml-5 mr-10" v-if="!loading">

        <form @submit.prevent="myHtml">

            <!-- 提交按钮 ~~~~~~~ -->

            <div class="flex flex-row mt-5 items-center">

                <div>
                    <input type="submit" class="px-4 py-2 rounded-lg bg-green-500 text-white text-base w-24"
                        value="Submit" />
                </div>

                <div class="ml-5">
                    <!-- <router-link to="/schooltable" class="px-4 py-2 rounded-lg bg-gray-500 text-white text-base w-24">取消</router-link> -->
                    <input type="button" class="px-4 py-2 rounded-lg bg-gray-500 text-white text-base w-24" value="取消"
                        @click="backSchool" />
                </div>

            </div>

            <!-- 提交按钮 ~~~~~~~ -->

            <!-- 编辑框区域 ~~~~~~~ -->

            <div class="flex flex-col items-center">

                <!-- 编辑框区域 ~~~~~~~ -->

                <div class="flex flex-row justify-start">

                    <!-- 1 ~~~~~~ -->

                    <div class="mt-5 mb-2" v-if="contact && contact.fields">

                        <textarea id="the_images" rows="30" v-model="contact_html.html_1"
                            class="w-56 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""></textarea>

                    </div>

                    <!-- 2 ~~~~~~ -->

                    <div class="mt-5 mb-2 ml-5" v-if="contact && contact.fields">

                        <textarea id="the_images" rows="30" v-model="contact_html.html_2"
                            class="w-56 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""></textarea>

                    </div>

                    <!-- 3 ~~~~~~ -->

                    <div class="mt-5 mb-2 ml-5" v-if="contact && contact.fields">

                        <textarea id="the_images" rows="30" v-model="contact_html.html_3"
                            class="w-56 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""></textarea>

                    </div>

                    <!-- 4 ~~~~~~ -->

                    <div class="mt-5 mb-2 ml-5" v-if="contact && contact.fields">

                        <textarea id="the_images" rows="30" v-model="contact_html.html_4"
                            class="w-56 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""></textarea>

                    </div>

                    <!-- 5 ~~~~~~ -->

                    <div class="mt-5 mb-2 ml-5" v-if="contact && contact.fields">

                        <textarea id="the_images" rows="30" v-model="contact_html.html_5"
                            class="w-56 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder=""></textarea>

                    </div>

                    <!-- ~~~~~~ -->

                </div>

                <!-- 编辑框区域 ~~~~~~~ -->

            </div>

            <!-- 编辑框区域 ~~~~~~~ -->

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

            contact_html: {},
            contact_html_array: [],

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

                    // Fetch the Html Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                    let res_html = await ContactService.getSchoolHtml(this.contactId)

                    if (res_html) {

                        // this.contact_html = res_html.data.records[0]

                        if (res_html.data.records[0]) {
                            const { html_1, html_2, html_3, html_4, html_5, ...rest } = res_html.data.records[0].fields;
                            // const { id, link_id, ...filteredFields } = rest;
                            const { id, ...filteredFields } = rest;

                            console.log('get html --->', res_html.data.records[0])
                            // this.contact_html = res_html.data.records[0].fields
                            this.contact_html = {
                                ...filteredFields,
                                html_1: html_1 || '',
                                html_2: html_2 || '',
                                html_3: html_3 || '',
                                html_4: html_4 || '',
                                html_5: html_5 || ''
                            };

                            console.log('map ... html --->', this.contact_html)

                        } else {
                            console.log('empty empty html --->')
                            this.contact_html = { link_id: this.contactId, html_1: '', html_2: '', html_3: '', html_4: '', html_5: '' };

                            console.log('else empty ... html --->', this.contact_html)
                        }

                    }

                    // Fetch the Html Data ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

        async myHtml() {
            this.loading = true;
            this.currentUserId = await this.currentUser();

            if (this.currentUserId) {

                try {

                    if (!this.contact_html.html_1.includes('<div style="line-height: 180%;">')) {
                        this.contact_html.html_1 = '<div style="line-height: 180%;">' + this.contact_html.html_1 + '</div>';
                    }

                    if (!this.contact_html.html_2.includes('<div style="line-height: 180%;">')) {
                        this.contact_html.html_2 = '<div style="line-height: 180%;">' + this.contact_html.html_2 + '</div>';
                    }

                    if (!this.contact_html.html_3.includes('<div style="line-height: 180%;">')) {
                        this.contact_html.html_3 = '<div style="line-height: 180%;">' + this.contact_html.html_3 + '</div>';
                    }

                    if (!this.contact_html.html_4.includes('<div style="line-height: 180%;">')) {
                        this.contact_html.html_4 = '<div style="line-height: 180%;">' + this.contact_html.html_4 + '</div>';
                    }

                    if (!this.contact_html.html_5.includes('<div style="line-height: 180%;">')) {
                        this.contact_html.html_5 = '<div style="line-height: 180%;">' + this.contact_html.html_5 + '</div>';
                    }
                    // this.contact_html.html_2 = '<div style="line-height: 180%;">' + this.contact_html.html_2 + '</div>'
                    // this.contact_html.html_3 = '<div style="line-height: 180%;">' + this.contact_html.html_3 + '</div>'
                    // this.contact_html.html_4 = '<div style="line-height: 180%;">' + this.contact_html.html_4 + '</div>'
                    // this.contact_html.html_5 = '<div style="line-height: 180%;">' + this.contact_html.html_5 + '</div>'

                    // let response = await ContactService.createContact(this.contact)
                    let response = await ContactService.airUpdateHtml(this.contact_html, this.contactId);
                    console.log("GPT air update html response------------>", response);

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
                        const currentRoute = this.$router.currentRoute;
                        if (currentRoute.path !== `/schoolhtml/${this.contactId}`) {
                            this.$router.push(`/schoolhtml/${this.contactId}`); // Navigate to the page
                        }
                    }
                } catch (error) {
                    this.errorMessage = error;
                    // console.log(this.errorMessage);
                    this.loading = false;
                }
            }
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
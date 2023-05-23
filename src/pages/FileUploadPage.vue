<template>
    <MainHeader />

    <MainNav />
    <div class="container mt-4">

        <div class="col-12">
            <div class="card">
                <div class="card-body checkout-tab">
                    <div class="bg-blue-100 p-4 rounded">
                        <h2 class="text-xl font-semibold mb-4">Upload CSV File</h2>
                        <form @submit.prevent="submitForm">
                            <div class="row">
                                <div class="col-3">
                                    <div class="mt-1">
                                        <label for="data_type" class="block mb-2 font-medium">Data Type</label>
                                        <select v-model="dataType" id="file_type" class="form-select mb-4">
                                            <option value="Candidates">Candidates</option>
                                            <option value="Contributions">Contributions</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="mt-1">
                                        <label for="jurisdiction" class="block mb-2 font-medium">Jurisdiction</label>
                                        <select v-model="jurisdiction" id="file_type" class="form-select mb-4">
                                            <option v-for="item in jurisdictions" :key="item" :value="item">{{ item }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-3">
                                    <div class="mt-1">
                                        <label for="year" class="block mb-2 font-medium">Year</label>
                                        <input v-model="year" type="text" id="year" class="form-control mb-4" />
                                    </div>
                                </div>

                                <div class="col-3">
                                    <div class="mt-1">
                                        <label for="dataFile" class="block mb-2 font-medium">CSV File</label>
                                        <input @change="uploadFile" type="file" id="dataFile" class="form-control mb-4" />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" :disabled="loading" class="btn btn-primary bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import MainNav from "@/components/core/MainNav.vue";
import MainHeader from "@/components/core/MainHeader.vue";

export default {
    components: {MainHeader, MainNav},
    data() {
        return {
            fileType: 'Candidates',
            jurisdiction: '',
            jurisdictions: [],
            year: '2024',
            file: null,
            loading: false,
        };
    },
    methods: {
        uploadFile(event) {
            this.file = event.target.files[0];
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('data_file', this.file);
            formData.append('data_type', this.fileType);
            formData.append('jurisdiction', this.jurisdiction);
            formData.append('year', this.year);

            try {
                this.loading = true;
                const response = await axios.post(`${process.env.VUE_APP_API_URL}/file_upload`, formData);
                this.loading = false;
                alert(response.data.message);
            } catch (error) {
                this.loading = false;
                alert(error.message);
                console.error('There was a problem uploading the file:', error.message);
            }
        },
    },
    async mounted() {
        try {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}/jurisdictions`);
            this.jurisdictions = response.data;

        } catch (error) {
            console.error('There was a problem getting the jurisdictions:', error.message);
        }
    }



};
</script>
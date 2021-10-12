const PostValidGroups = [
    {
        grp_name: "Mustafa_Test_Group",
        grp_section: 1,
        grp_start_prd_id: 1,
        grp_gtp_id: 1,
        start_year: 2020,
        grp_end_prd_id: 1,
        end_year: 2020
    },
    {
        grp_name: "Mustafa_Test_Group_Updated",
        grp_section: 2,
        grp_start_prd_id: 2,
        grp_gtp_id: 2,
        start_year: 2021,
        grp_end_prd_id: 2,
        end_year: 2021
    },
    {
        grp_name: "Mustafa_Test_No_Section",
        grp_section: "", 
        grp_start_prd_id: 3,
        grp_gtp_id: 3,
        start_year: 2019,
        grp_end_prd_id: 4,
        end_year: 2021
    },
    {
        grp_name: "Mustafa_Test_No_End_Period",
        grp_section: 1, 
        grp_start_prd_id: 4,
        grp_gtp_id: 4,
        start_year: 2018,
        grp_end_prd_id: "",
        end_year: 2019
    },
    {
        grp_name: "Mustafa_Test_No_End_Year",
        grp_section: 1, 
        grp_start_prd_id: 2,
        grp_gtp_id: 2,
        start_year: 2017,
        grp_end_prd_id: 2,
        end_year: ""
    },
    {
        grp_name: 1234,
        grp_section: 3, 
        grp_start_prd_id: 3,
        grp_gtp_id: 3,
        start_year: 2019,
        grp_end_prd_id: 4,
        end_year: 2021
    }
]

const PostInvalidGroups = [
    {
        grp_name: "",
        grp_section: 1, 
        grp_start_prd_id: 4,
        grp_gtp_id: 4,
        start_year: 2018,
        grp_end_prd_id: 2,
        end_year: 2021
    },
    {
        grp_name: null,
        grp_section: "", 
        grp_start_prd_id: 2,
        grp_gtp_id: 2,
        start_year: 2017,
        grp_end_prd_id: 2,
        end_year: 2021
    },
    {
        grp_name: "Test a String section",
        grp_section: "Invalid string", 
        grp_start_prd_id: 2,
        grp_gtp_id: 2,
        start_year: 2017,
        grp_end_prd_id: 2,
        end_year: 2021
    },
    {
        grp_name: "Test a string period Id",
        grp_section: 1, 
        grp_start_prd_id: "2times",
        grp_gtp_id: 2,
        start_year: 2017,
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a blank period Id",
        grp_section: 1, 
        grp_start_prd_id: "",
        grp_gtp_id: 2,
        start_year: 2017,
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a null period Id",
        grp_section: 1, 
        grp_start_prd_id: null,
        grp_gtp_id: "invalid",
        start_year: 2017,
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a string group type Id",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: "invalid",
        start_year: 2017,
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a blank group type Id",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: "",
        start_year: 2017,
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a null group type Id",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: null,
        start_year: 2017,
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test an empty start year",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: 1,
        start_year: "",
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a null start year",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: 1,
        start_year: null,
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a String start year",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: 1,
        start_year: "2017",
        grp_end_prd_id: 1,
        end_year: 2021
    },
    {
        grp_name: "Test a String end prd id",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: 1,
        start_year: "2017",
        grp_end_prd_id : "2",
        end_year: 2021
    },
    {
        grp_name: "Test a null end prd id",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: 1,
        start_year: "2017",
        grp_end_prd_id : null,
        end_year: 2021
    },
    {
        grp_name: "Test a String end year",
        grp_section: 1, 
        grp_start_prd_id: 1,
        grp_gtp_id: 1,
        start_year: "2017",
        grp_end_prd_id : 2,
        end_year: "2018"
    },
    {
        grp_name: "Test a null end year",
        grp_section: 1, 
        grp_start_prd_id: 3,
        grp_gtp_id: 1,
        start_year: "2017",
        grp_end_prd_id : 2,
        end_year: null
    }


]
module.exports = {
    PostValidGroups,
    PostInvalidGroups
}
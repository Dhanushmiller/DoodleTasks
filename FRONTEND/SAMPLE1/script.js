document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');
    const stateSelect = document.getElementById('stateSelect');
    const citySelect = document.getElementById('citySelect');
    const countrySelect = document.getElementById('countrySelect');

    // --- DATA ---
    const countries = ["India"];

    const stateCityData = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool"],
        "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
        "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
        "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
        "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
        "Goa": ["Panaji", "Margao", "Vasco da Gama"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
        "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala"],
        "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
        "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
        "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
        "Meghalaya": ["Shillong", "Tura", "Jowai"],
        "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
        "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
        "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"],
        "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
        "Sikkim": ["Gangtok", "Namchi", "Geyzing"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
        "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
        "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
        "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
        "Jammu & Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
        "Puducherry": ["Pondicherry", "Karaikal", "Mahe"]
    };

    // --- POPULATE COUNTRIES ---
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        if (country === "India") option.selected = true;
        countrySelect.appendChild(option);
    });

    // --- POPULATE STATES (Based on India by default) ---
    function populateStates() {
        stateSelect.innerHTML = '<option value="">Select State</option>';
        Object.keys(stateCityData).sort().forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }

    populateStates();

    // --- POPULATE CITIES ON STATE CHANGE ---
    stateSelect.addEventListener('change', () => {
        const selectedState = stateSelect.value;
        citySelect.innerHTML = '<option value="">Select City</option>';
        
        if (selectedState && stateCityData[selectedState]) {
            stateCityData[selectedState].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    // --- SAVE PROGRESS LOGIC ---
    saveBtn.addEventListener('click', () => {
        const formData = {
            creatorName: document.querySelector('input[placeholder="Narendra Modi"]').value,
            instagram: document.querySelector('input[placeholder="narendramodi"]').value,
            country: countrySelect.value,
            state: stateSelect.value,
            city: citySelect.value
        };

        console.log('Form data being saved:', formData);
        
        saveBtn.textContent = 'Saving...';
        saveBtn.disabled = true;

        setTimeout(() => {
            saveBtn.textContent = 'Saved!';
            saveBtn.style.backgroundColor = '#ee3131';
            saveBtn.style.color = '#fff';
            
            alert('Draft saved successfully!');

            setTimeout(() => {
                saveBtn.textContent = 'Save As Draft';
                saveBtn.style.backgroundColor = 'transparent';
                saveBtn.style.color = '#ee3131';
                saveBtn.disabled = false;
            }, 2000);
        }, 1000);
    });
});

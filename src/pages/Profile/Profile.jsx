import React, { useState, useEffect, useRef } from "react";
import styles from "./Profile.module.css";
import { 
  FaCamera, FaUpload, FaUser, FaPhone, FaEnvelope, FaCalendar, 
  FaGlobe, FaMapMarkerAlt, FaTrash, FaImage, FaEdit, FaSave,
  FaCheckCircle, FaExclamationCircle, FaFile, FaCalendarAlt, FaIdCard
} from "react-icons/fa";

const STATES_AND_DISTRICTS = {
  "Andhra Pradesh": [
    "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", 
    "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", 
    "Vizianagaram", "West Godavari", "YSR Kadapa"
  ],
  "Arunachal Pradesh": [
    "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", 
    "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", 
    "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", 
    "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", 
    "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
  ],
  "Assam": [
    "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
    "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", 
    "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", 
    "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", 
    "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", 
    "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", 
    "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", 
    "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", 
    "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", 
    "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", 
    "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", 
    "Vaishali", "West Champaran"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", 
    "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", 
    "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Korea", "Mahasamund", 
    "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", 
    "Surajpur", "Surguja"
  ],
  "Delhi": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
    "North West Delhi", "Shahdara", "South Delhi", "South West Delhi", "West Delhi"
  ],
  "Goa": [
    "North Goa", "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", 
    "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", 
    "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", 
    "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", 
    "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", 
    "Tapi", "Vadodara", "Valsad"
  ],
  "Haryana": [
    "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", 
    "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", 
    "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", 
    "Sonipat", "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", 
    "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
  ],
  "Jammu and Kashmir": [
    "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", 
    "Jammu", "Kargil", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", 
    "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", 
    "Srinagar", "Udhampur"
  ],
  "Jharkhand": [
    "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", 
    "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", 
    "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", 
    "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", 
    "Bidar", "Chamarajanagara", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", 
    "Dakshina Kannada", "Davangere", "Dharwad", "Gadag", "Hassan", "Haveri", 
    "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", 
    "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", 
    "Yadgir"
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", 
    "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", 
    "Thiruvananthapuram", "Thrissur", "Wayanad"
  ],
  "Ladakh": [
    "Kargil", "Leh"
  ],
  "Madhya Pradesh": [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", 
    "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", 
    "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", 
    "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", 
    "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", 
    "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", 
    "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", 
    "Umaria", "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", 
    "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", 
    "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", 
    "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Parbhani", 
    "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", 
    "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", 
    "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", 
    "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", 
    "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", 
    "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", 
    "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"
  ],
  "Nagaland": [
    "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", 
    "Phek", "Tuensang", "Wokha", "Zunheboto"
  ],
  "Odisha": [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
    "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", 
    "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", 
    "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
    "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
  ],
  "Puducherry": [
    "Karaikal", "Mahe", "Puducherry", "Yanam"
  ],
  "Punjab": [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", 
    "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", 
    "Mansa", "Moga", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Rupnagar", 
    "Sangrur", "SAS Nagar", "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", 
    "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", 
    "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", 
    "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", 
    "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
  ],
  "Sikkim": [
    "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
  ],
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", 
    "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", 
    "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", 
    "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
    "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", 
    "Jayashankar Bhupalapally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", 
    "Khammam", "Komaram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", 
    "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", 
    "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", 
    "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", 
    "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", 
    "Unakoti", "West Tripura"
  ],
  "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", 
    "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", 
    "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", 
    "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", 
    "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", 
    "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", 
    "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", 
    "Kanpur Dehat", "Kanpur Nagar", "Kanshiram Nagar", "Kaushambi", "Kushinagar", 
    "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", 
    "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", 
    "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Rae Bareli", 
    "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", 
    "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", 
    "Sultanpur", "Unnao", "Varanasi"
  ],
  "Uttarakhand": [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", 
    "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", 
    "Udham Singh Nagar", "Uttarkashi"
  ],
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", 
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", 
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", 
    "North Dinajpur", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", 
    "Purba Medinipur", "Purulia", "South 24 Parganas", "South Dinajpur", 
    "Uttar Dinajpur"
  ]
};

const EmployeeProfile = () => {
  // Initial state with a clean copy function to avoid reference issues
  const initialState = {
    employeeId: '1235456',
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      bloodGroup: '',
      maritalStatus: '',
      nationality: '',
      religion: '',
      caste: '',
      aadharNumber: '',
      panNumber: '',
      passportNumber: '',
      drivingLicense: '',
      voterId: '',
      profilePicture: null
    },
    contactDetails: {
      address: '',
      city: '',
      state: '',
      district: '',
      postalCode: '',
      emergencyContact: '',
      emergencyPhone: ''
    },
    educationalDetails: {
    tenth: {
        school: '',
        board: '',
        year: '',
        percentage: '',
        certificate: null
      },
    twelfth: {
        school: '',
        board: '',
        year: '',
        percentage: '',
        certificate: null
      },
      college: {
        college: '',
        university: '',
        degree: '',
        year: '',
        percentage: '',
        certificate: null
      }
    },
    bankDetails: {
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountType: ''
    }
  };

  // Add isEditing state
  const [isEditing, setIsEditing] = useState(false);

  // Load data from localStorage first, then initialize state
  const loadInitialData = () => {
    try {
      const savedData = localStorage.getItem("employeeData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        return {
          ...initialState,
          ...parsedData,
          personalDetails: {
            ...initialState.personalDetails,
            ...(parsedData.personalDetails || {})
          },
          contactDetails: {
            ...initialState.contactDetails,
            ...(parsedData.contactDetails || {})
          },
          educationalDetails: {
            ...initialState.educationalDetails,
            tenth: {
              ...initialState.educationalDetails.tenth,
              ...(parsedData.educationalDetails?.tenth || {})
            },
            twelfth: {
              ...initialState.educationalDetails.twelfth,
              ...(parsedData.educationalDetails?.twelfth || {})
            },
    college: {
              ...initialState.educationalDetails.college,
              ...(parsedData.educationalDetails?.college || {})
            }
          },
          bankDetails: {
            ...initialState.bankDetails,
            ...(parsedData.bankDetails || {})
          }
        };
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
    return initialState;
  };

  const [employeeData, setEmployeeData] = useState(loadInitialData());

  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const profileOptionsRef = useRef(null);
  const profileInputRef = useRef(null);

  const [editableSections, setEditableSections] = useState({
    personal: false,
    contact: false,
    education10: false,
    education12: false,
    college: false,
    bank: false
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const [districts, setDistricts] = useState([]);

  // Calculate max date for date picker (2007-12-31)
  const maxDate = "2007-12-31";

  // Add new state for file preview
  const [previewFile, setPreviewFile] = useState({
    show: false,
    type: null,
    url: null,
    title: null
  });

  // Update useEffect for loading data from localStorage
  useEffect(() => {
    // This just updates districts based on the loaded state
    if (employeeData.contactDetails && employeeData.contactDetails.state && 
        STATES_AND_DISTRICTS[employeeData.contactDetails.state]) {
      setDistricts(STATES_AND_DISTRICTS[employeeData.contactDetails.state]);
    }
    
    console.log("Data initialized from localStorage:", employeeData);
  }, []);

  // More robust save to localStorage function with error handling and sanitization
  const saveToLocalStorage = (data) => {
    try {
      // Create a safe copy to avoid circular references
      const dataToSave = JSON.parse(JSON.stringify(data));
      localStorage.setItem("employeeData", JSON.stringify(dataToSave));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  // Save data to localStorage whenever employeeData changes
  useEffect(() => {
    // Skip the initial render to avoid overwriting with default values
    if (Object.keys(employeeData).length > 0) {
      saveToLocalStorage(employeeData);
    }
  }, [employeeData]);

  const handleChange = (e, section, field) => {
    if (section === "tenth" || section === "twelfth" || section === "college") {
      // Handle educational details
      setEmployeeData({
        ...employeeData,
        educationalDetails: {
          ...employeeData.educationalDetails,
        [section]: {
            ...employeeData.educationalDetails[section],
          [field]: e.target.value,
          },
        },
      });
    } else if (section === "personalDetails") {
      // Handle personal details
      setEmployeeData({
        ...employeeData,
        personalDetails: {
          ...employeeData.personalDetails,
        [field]: e.target.value,
        },
      });
    } else if (section === "contactDetails") {
      // Handle contact details
      setEmployeeData({
        ...employeeData,
        contactDetails: {
          ...employeeData.contactDetails,
          [field]: e.target.value,
        },
      });
    } else if (field && !section) {
      // Handle bank details fields
      setEmployeeData({
        ...employeeData,
        bankDetails: {
          ...employeeData.bankDetails,
          [field]: e.target.value,
        },
      });
    } else {
      // Handle direct fields (if any)
      setEmployeeData({
        ...employeeData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileUpload = (e, section, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        let newData = { ...employeeData };
        
        if (section === "tenth" || section === "twelfth" || section === "college") {
          // Handle educational certificates
          newData = {
            ...newData,
            educationalDetails: {
              ...newData.educationalDetails,
            [section]: {
                ...newData.educationalDetails[section],
              [field]: reader.result,
              }
            }
          };
        } else if (field === "profilePicture") {
          // Handle profile picture
          newData = {
            ...newData,
            personalDetails: {
              ...newData.personalDetails,
              profilePicture: reader.result
            }
          };
          
          // Explicitly save profile picture to localStorage
          saveToLocalStorage(newData);
        }
        
        // Update state with new data
        setEmployeeData(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePictureClick = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleChangeProfilePicture = () => {
    profileInputRef.current?.click();
    setShowProfileOptions(false);
  };

  const handleDeleteProfilePicture = () => {
    // Update state
    setEmployeeData({
      ...employeeData,
      personalDetails: {
        ...employeeData.personalDetails,
        profilePicture: null
      }
    });
    
    // Explicitly save the change to localStorage
    saveToLocalStorage(employeeData);
    
    setShowProfileOptions(false);
    showNotification('Profile picture removed', 'success');
  };

  const toggleSectionEdit = (section) => {
    setEditableSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const validateSection = (section) => {
    switch (section) {
      case 'personal':
        return (
          employeeData.personalDetails.firstName &&
          employeeData.personalDetails.lastName &&
          employeeData.personalDetails.email &&
          employeeData.personalDetails.phone &&
          employeeData.personalDetails.dateOfBirth &&
          employeeData.personalDetails.gender &&
          employeeData.personalDetails.bloodGroup &&
          employeeData.personalDetails.maritalStatus &&
          employeeData.personalDetails.nationality &&
          employeeData.personalDetails.religion &&
          employeeData.personalDetails.caste &&
          employeeData.personalDetails.aadharNumber &&
          employeeData.personalDetails.panNumber &&
          employeeData.personalDetails.passportNumber &&
          employeeData.personalDetails.drivingLicense &&
          employeeData.personalDetails.voterId
        );
      case 'contact':
        return (
          employeeData.contactDetails.address &&
          employeeData.contactDetails.city &&
          employeeData.contactDetails.state &&
          employeeData.contactDetails.district &&
          employeeData.contactDetails.postalCode &&
          employeeData.contactDetails.emergencyContact &&
          employeeData.contactDetails.emergencyPhone
        );
      case 'education10':
        return (
          employeeData.educationalDetails.tenth.school &&
          employeeData.educationalDetails.tenth.board &&
          employeeData.educationalDetails.tenth.year &&
          employeeData.educationalDetails.tenth.percentage &&
          employeeData.educationalDetails.tenth.certificate
        );
      case 'education12':
        return (
          employeeData.educationalDetails.twelfth.school &&
          employeeData.educationalDetails.twelfth.board &&
          employeeData.educationalDetails.twelfth.year &&
          employeeData.educationalDetails.twelfth.percentage &&
          employeeData.educationalDetails.twelfth.certificate
        );
      case 'college':
        return (
          employeeData.educationalDetails.college.college &&
          employeeData.educationalDetails.college.university &&
          employeeData.educationalDetails.college.degree &&
          employeeData.educationalDetails.college.year &&
          employeeData.educationalDetails.college.percentage &&
          employeeData.educationalDetails.college.certificate
        );
      case 'bank':
        return (
          employeeData.bankDetails.bankName &&
          employeeData.bankDetails.accountNumber &&
          employeeData.bankDetails.ifscCode &&
          employeeData.bankDetails.accountType
        );
      default:
        return false;
    }
  };

  const handleSectionSave = (section) => {
    if (!validateSection(section)) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    const saved = saveToLocalStorage(employeeData);
    if (saved) {
      toggleSectionEdit(section);
      showNotification('Changes saved successfully!', 'success');
        } else {
      showNotification('Error saving changes. Please try again.', 'error');
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    
    // Update state value in contactDetails
          setEmployeeData({
            ...employeeData,
      contactDetails: {
        ...employeeData.contactDetails,
        state: selectedState,
        // Reset district when state changes
        district: ''
      }
    });
    
    // Update districts based on selected state
    if (STATES_AND_DISTRICTS[selectedState]) {
      setDistricts(STATES_AND_DISTRICTS[selectedState]);
    } else {
      setDistricts([]);
    }
  };

  // Add function to handle file preview
  const handleFilePreview = (fileData, title) => {
    if (!fileData) return;
    
    // Check if the file is an image or PDF
    const isImage = fileData.startsWith('data:image');
    const isPDF = fileData.startsWith('data:application/pdf');
    
    setPreviewFile({
      show: true,
      type: isImage ? 'image' : isPDF ? 'pdf' : 'other',
      url: fileData,
      title: title
    });
  };

  // Add function to close preview
  const closePreview = () => {
    setPreviewFile({
      show: false,
      type: null,
      url: null,
      title: null
    });
  };

  // Add click outside handler for preview
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewFile.show && event.target.classList.contains(styles.previewOverlay)) {
        closePreview();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [previewFile.show]);

  // Handle clicks outside profile options menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOptionsRef.current && !profileOptionsRef.current.contains(event.target)) {
        setShowProfileOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      {!isEditing ? (
        <div className={`${styles.profileCard} ${styles.cardView}`}>
          <div className={styles.cardHeader}>
            <div className={styles.cardProfilePicture}>
              {employeeData.personalDetails.profilePicture ? (
                <img src={employeeData.personalDetails.profilePicture} alt="Profile" />
              ) : (
                <div className={styles.noProfilePicture}>
                  <FaUser size={40} />
                  <span>No Photo</span>
                </div>
              )}
            </div>
            <div className={styles.cardEmployeeId}>
              <FaIdCard /> {employeeData.employeeId}
            </div>
            <h2 className={styles.cardName}>{employeeData.personalDetails.firstName ? `${employeeData.personalDetails.firstName} ${employeeData.personalDetails.lastName}` : "Employee Name"}</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardInfo}>
              <FaEnvelope />
              <span>{employeeData.personalDetails.email || "Not Provided"}</span>
            </div>
            <div className={styles.cardInfo}>
              <FaCalendarAlt />
              <span>{employeeData.personalDetails.dateOfBirth || "Not Provided"}</span>
            </div>
            <button 
              className={styles.editProfileButton}
              onClick={() => setIsEditing(true)}
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <div className={`${styles.editView} ${!isEditing ? styles.hide : ''}`}>
          <div className={styles.profileHeader}>
            <div className={styles.profilePictureContainer}>
              <div className={styles.pictureWrapper} onClick={() => profileInputRef.current?.click()}>
                {employeeData.personalDetails.profilePicture ? (
                  <img 
                    src={employeeData.personalDetails.profilePicture} 
                    alt="Profile" 
                    className={styles.profilePicture}
                  />
                ) : (
                  <div className={styles.noProfilePicture}>
                    <FaUser size={40} />
                    <span>Add Photo</span>
                  </div>
                )}
                <div className={styles.cameraIcon}>
                  <FaCamera />
                </div>
              </div>
              <input
                type="file"
                ref={profileInputRef}
                onChange={(e) => handleFileUpload(e, null, "profilePicture")}
                accept="image/*"
                style={{ display: 'none' }}
              />
              {showProfileOptions && (
                <div className={styles.profileOptions}>
                  <div className={styles.optionItem} onClick={() => profileInputRef.current?.click()}>
                    <FaCamera /> Change Photo
                  </div>
                  <div className={`${styles.optionItem} ${styles.delete}`} onClick={handleDeleteProfilePicture}>
                    <FaTrash /> Remove Photo
                  </div>
                </div>
              )}
            </div>
            <h2>{employeeData.personalDetails.firstName ? `${employeeData.personalDetails.firstName} ${employeeData.personalDetails.lastName}` : "Employee Name"}</h2>
            <div className={styles.employeeId}>
              <span>Employee ID: {employeeData.employeeId}</span>
            </div>
            <div className={styles.headerInfo}>
              <span><FaEnvelope /> {employeeData.personalDetails.email || "Not Provided"}</span>
              <span><FaCalendarAlt /> Joined: {employeeData.personalDetails.dateOfBirth || "Not Provided"}</span>
            </div>
          </div>

          {/* Personal Details */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Personal Details</h3>
              <button 
                className={`${styles.editButton} ${editableSections.personal ? styles.save : styles.edit}`}
                onClick={() => editableSections.personal 
                  ? handleSectionSave('personal')
                  : toggleSectionEdit('personal')
                }
              >
                {editableSections.personal ? (
                  <><FaSave /> Save</>
                ) : (
                  <><FaEdit /> Edit</>
                )}
              </button>
            </div>
            <div className={styles.sectionGrid}>
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={styles.label}>
                  <FaUser /> First Name *
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={employeeData.personalDetails.firstName}
                    onChange={(e) => handleChange(e, "personalDetails", "firstName")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={styles.label}>
                  <FaUser /> Last Name *
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={employeeData.personalDetails.lastName}
                    onChange={(e) => handleChange(e, "personalDetails", "lastName")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={styles.label}>
                  <FaEnvelope /> Email
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={employeeData.personalDetails.email}
                    onChange={(e) => handleChange(e, "personalDetails", "email")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={styles.label}>
                  <FaPhone /> Phone Number *
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={employeeData.personalDetails.phone}
                    onChange={(e) => handleChange(e, "personalDetails", "phone")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  <FaCalendar /> Date of Birth
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="date"
                    value={employeeData.personalDetails.dateOfBirth}
                    onChange={(e) => handleChange(e, "personalDetails", "dateOfBirth")}
                    disabled={!editableSections.personal}
                    max={maxDate}
                    className={styles.dateInput}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Gender
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <select
                    value={employeeData.personalDetails.gender}
                    onChange={(e) => handleChange(e, "personalDetails", "gender")}
                    className={styles.input}
                    disabled={!editableSections.personal}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={styles.label}>
                  <FaGlobe /> Nationality
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter nationality"
                    value={employeeData.personalDetails.nationality}
                    onChange={(e) => handleChange(e, "personalDetails", "nationality")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Blood Group
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <select
                    value={employeeData.personalDetails.bloodGroup}
                    onChange={(e) => handleChange(e, "personalDetails", "bloodGroup")}
                    className={styles.input}
                    disabled={!editableSections.personal}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Marital Status
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <select
                    value={employeeData.personalDetails.maritalStatus}
                    onChange={(e) => handleChange(e, "personalDetails", "maritalStatus")}
                    className={styles.input}
                    disabled={!editableSections.personal}
                  >
                    <option value="">Select Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Religion
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter religion"
                    value={employeeData.personalDetails.religion}
                    onChange={(e) => handleChange(e, "personalDetails", "religion")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Caste
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter caste"
                    value={employeeData.personalDetails.caste}
                    onChange={(e) => handleChange(e, "personalDetails", "caste")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Aadhar Number
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter Aadhar number"
                    value={employeeData.personalDetails.aadharNumber}
                    onChange={(e) => handleChange(e, "personalDetails", "aadharNumber")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  PAN Number
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter PAN number"
                    value={employeeData.personalDetails.panNumber}
                    onChange={(e) => handleChange(e, "personalDetails", "panNumber")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Passport Number
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter passport number"
                    value={employeeData.personalDetails.passportNumber}
                    onChange={(e) => handleChange(e, "personalDetails", "passportNumber")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Driving License
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter driving license number"
                    value={employeeData.personalDetails.drivingLicense}
                    onChange={(e) => handleChange(e, "personalDetails", "drivingLicense")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
              
              <div className={`${styles.inputGroup} ${!editableSections.personal ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  Voter ID
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.personal ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter voter ID"
                    value={employeeData.personalDetails.voterId}
                    onChange={(e) => handleChange(e, "personalDetails", "voterId")}
                    disabled={!editableSections.personal}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Contact Information</h3>
              <button 
                className={`${styles.editButton} ${editableSections.contact ? styles.save : styles.edit}`}
                onClick={() => editableSections.contact 
                  ? handleSectionSave('contact')
                  : toggleSectionEdit('contact')
                }
              >
                {editableSections.contact ? (
                  <><FaSave /> Save</>
                ) : (
                  <><FaEdit /> Edit</>
                )}
              </button>
            </div>
            <div className={styles.sectionGrid}>
              {/* Address */}
              <div className={`${styles.inputGroup} ${!editableSections.contact ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  <FaMapMarkerAlt /> Address
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.contact ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter complete address"
                    value={employeeData.contactDetails.address}
                    onChange={(e) => handleChange(e, "contactDetails", "address")}
                    disabled={!editableSections.contact}
                  />
                </div>
              </div>

              {/* State Selection */}
              <div className={`${styles.inputGroup} ${!editableSections.contact ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  State
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.contact ? styles.editable : ''}`}>
                  <select
                    value={employeeData.contactDetails.state}
                    onChange={handleStateChange}
                    disabled={!editableSections.contact}
                    className={styles.input}
                  >
                    <option value="">Select State</option>
                    {Object.keys(STATES_AND_DISTRICTS).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* District Selection */}
              <div className={`${styles.inputGroup} ${!editableSections.contact ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  District
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.contact ? styles.editable : ''}`}>
                  <select
                    value={employeeData.contactDetails.district}
                    onChange={(e) => handleChange(e, "contactDetails", "district")}
                    disabled={!editableSections.contact || !districts.length}
                    className={styles.input}
                  >
                    <option value="">Select District</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City */}
              <div className={`${styles.inputGroup} ${!editableSections.contact ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  City
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.contact ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={employeeData.contactDetails.city}
                    onChange={(e) => handleChange(e, "contactDetails", "city")}
                    disabled={!editableSections.contact}
                  />
                </div>
              </div>

              {/* Postal Code */}
              <div className={`${styles.inputGroup} ${!editableSections.contact ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  <FaMapMarkerAlt /> Postal Code
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.contact ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter postal code"
                    value={employeeData.contactDetails.postalCode}
                    onChange={(e) => handleChange(e, "contactDetails", "postalCode")}
                    disabled={!editableSections.contact}
                  />
                </div>
              </div>

              {/* Emergency Contact Name */}
              <div className={`${styles.inputGroup} ${!editableSections.contact ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  <FaUser /> Emergency Contact Name
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.contact ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter emergency contact name"
                    value={employeeData.contactDetails.emergencyContact}
                    onChange={(e) => handleChange(e, "contactDetails", "emergencyContact")}
                    disabled={!editableSections.contact}
                  />
                </div>
              </div>

              {/* Emergency Contact Phone */}
              <div className={`${styles.inputGroup} ${!editableSections.contact ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>
                  <FaPhone /> Emergency Contact Phone
                </label>
                <div className={`${styles.inputWrapper} ${editableSections.contact ? styles.editable : ''}`}>
                  <input
                    type="tel"
                    placeholder="Enter emergency contact number"
                    value={employeeData.contactDetails.emergencyPhone}
                    onChange={(e) => handleChange(e, "contactDetails", "emergencyPhone")}
                    disabled={!editableSections.contact}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Education Details */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Education Details</h3>
            
            {/* 10th Standard */}
            <div className={styles.subsection}>
              <div className={styles.sectionHeader}>
            <h4>10th Standard</h4>
                <button 
                  className={`${styles.editButton} ${editableSections.education10 ? styles.save : styles.edit}`}
                  onClick={() => editableSections.education10 
                    ? handleSectionSave('education10')
                    : toggleSectionEdit('education10')
                  }
                >
                  {editableSections.education10 ? (
                    <><FaSave /> Save</>
                  ) : (
                    <><FaEdit /> Edit</>
                  )}
                </button>
              </div>
              <div className={styles.sectionGrid}>
                <div className={`${styles.inputGroup} ${!editableSections.education10 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>School Name</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education10 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter school name"
                      value={employeeData.educationalDetails.tenth.school}
                      onChange={(e) => handleChange(e, "tenth", "school")}
                      disabled={!editableSections.education10}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education10 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Board</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education10 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter board"
                      value={employeeData.educationalDetails.tenth.board}
                      onChange={(e) => handleChange(e, "tenth", "board")}
                      disabled={!editableSections.education10}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education10 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Year</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education10 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter year"
                      value={employeeData.educationalDetails.tenth.year}
                      onChange={(e) => handleChange(e, "tenth", "year")}
                      disabled={!editableSections.education10}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education10 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Percentage</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education10 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter percentage"
                      value={employeeData.educationalDetails.tenth.percentage}
                      onChange={(e) => handleChange(e, "tenth", "percentage")}
                      disabled={!editableSections.education10}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education10 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Certificate</label>
                  <div className={styles.fileUploadContainer}>
                    {employeeData.educationalDetails.tenth.certificate ? (
                      <div className={styles.filePreview}>
                        <div className={styles.fileInfo}>
                          <FaFile className={styles.fileIcon} />
                          <span>Certificate Uploaded</span>
                        </div>
                        <div className={styles.fileActions}>
                          <button 
                            className={styles.previewButton}
                            onClick={() => handleFilePreview(employeeData.educationalDetails.tenth.certificate, "10th Certificate")}
                          >
                            View
                          </button>
                          <button 
                            className={styles.uploadButton}
                            onClick={() => document.getElementById('tenth-certificate').click()}
                          >
                            Change
                          </button>
                        </div>
                        <input
                          id="tenth-certificate"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, "tenth", "certificate")}
                          hidden
                        />
                      </div>
                    ) : (
                      <label className={styles.uploadButton}>
                        <FaUpload /> Upload Certificate
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, "tenth", "certificate")}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 12th Standard */}
            <div className={styles.subsection}>
              <div className={styles.sectionHeader}>
            <h4>12th Standard</h4>
                <button 
                  className={`${styles.editButton} ${editableSections.education12 ? styles.save : styles.edit}`}
                  onClick={() => editableSections.education12 
                    ? handleSectionSave('education12')
                    : toggleSectionEdit('education12')
                  }
                >
                  {editableSections.education12 ? (
                    <><FaSave /> Save</>
                  ) : (
                    <><FaEdit /> Edit</>
                  )}
                </button>
              </div>
              <div className={styles.sectionGrid}>
                <div className={`${styles.inputGroup} ${!editableSections.education12 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>School Name</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education12 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter school name"
                      value={employeeData.educationalDetails.twelfth.school}
                      onChange={(e) => handleChange(e, "twelfth", "school")}
                      disabled={!editableSections.education12}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education12 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Board</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education12 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter board"
                      value={employeeData.educationalDetails.twelfth.board}
                      onChange={(e) => handleChange(e, "twelfth", "board")}
                      disabled={!editableSections.education12}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education12 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Year</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education12 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter year"
                      value={employeeData.educationalDetails.twelfth.year}
                      onChange={(e) => handleChange(e, "twelfth", "year")}
                      disabled={!editableSections.education12}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education12 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Percentage</label>
                  <div className={`${styles.inputWrapper} ${editableSections.education12 ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter percentage"
                      value={employeeData.educationalDetails.twelfth.percentage}
                      onChange={(e) => handleChange(e, "twelfth", "percentage")}
                      disabled={!editableSections.education12}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.education12 ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Certificate</label>
                  <div className={styles.fileUploadContainer}>
                    {employeeData.educationalDetails.twelfth.certificate ? (
                      <div className={styles.filePreview}>
                        <div className={styles.fileInfo}>
                          <FaFile className={styles.fileIcon} />
                          <span>Certificate Uploaded</span>
                        </div>
                        <div className={styles.fileActions}>
                          <button 
                            className={styles.previewButton}
                            onClick={() => handleFilePreview(employeeData.educationalDetails.twelfth.certificate, "12th Certificate")}
                          >
                            View
                          </button>
                          <button 
                            className={styles.uploadButton}
                            onClick={() => document.getElementById('twelfth-certificate').click()}
                          >
                            Change
                          </button>
                        </div>
                        <input
                          id="twelfth-certificate"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, "twelfth", "certificate")}
                          hidden
                        />
                      </div>
                    ) : (
                      <label className={styles.uploadButton}>
                        <FaUpload /> Upload Certificate
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, "twelfth", "certificate")}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* College Details */}
            <div className={styles.subsection}>
              <div className={styles.sectionHeader}>
            <h4>College</h4>
                <button 
                  className={`${styles.editButton} ${editableSections.college ? styles.save : styles.edit}`}
                  onClick={() => editableSections.college 
                    ? handleSectionSave('college')
                    : toggleSectionEdit('college')
                  }
                >
                  {editableSections.college ? (
                    <><FaSave /> Save</>
                  ) : (
                    <><FaEdit /> Edit</>
                  )}
                </button>
          </div>
              <div className={styles.sectionGrid}>
                <div className={`${styles.inputGroup} ${!editableSections.college ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>College</label>
                  <div className={`${styles.inputWrapper} ${editableSections.college ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter college name"
                      value={employeeData.educationalDetails.college.college}
                      onChange={(e) => handleChange(e, "college", "college")}
                      disabled={!editableSections.college}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.college ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>University</label>
                  <div className={`${styles.inputWrapper} ${editableSections.college ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter university name"
                      value={employeeData.educationalDetails.college.university}
                      onChange={(e) => handleChange(e, "college", "university")}
                      disabled={!editableSections.college}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.college ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Degree</label>
                  <div className={`${styles.inputWrapper} ${editableSections.college ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter degree"
                      value={employeeData.educationalDetails.college.degree}
                      onChange={(e) => handleChange(e, "college", "degree")}
                      disabled={!editableSections.college}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.college ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Year</label>
                  <div className={`${styles.inputWrapper} ${editableSections.college ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter year"
                      value={employeeData.educationalDetails.college.year}
                      onChange={(e) => handleChange(e, "college", "year")}
                      disabled={!editableSections.college}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.college ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Percentage</label>
                  <div className={`${styles.inputWrapper} ${editableSections.college ? styles.editable : ''}`}>
                    <input
                      type="text"
                      placeholder="Enter percentage"
                      value={employeeData.educationalDetails.college.percentage}
                      onChange={(e) => handleChange(e, "college", "percentage")}
                      disabled={!editableSections.college}
                    />
                  </div>
                </div>
                <div className={`${styles.inputGroup} ${!editableSections.college ? styles.disabled : ''}`}>
                  <label className={`${styles.label} ${styles.required}`}>Certificate</label>
                  <div className={styles.fileUploadContainer}>
                    {employeeData.educationalDetails.college.certificate ? (
                      <div className={styles.filePreview}>
                        <div className={styles.fileInfo}>
                          <FaFile className={styles.fileIcon} />
                          <span>Certificate Uploaded</span>
                        </div>
                        <div className={styles.fileActions}>
                          <button 
                            className={styles.previewButton}
                            onClick={() => handleFilePreview(employeeData.educationalDetails.college.certificate, "College Certificate")}
                          >
                            View
                          </button>
                          <button 
                            className={styles.uploadButton}
                            onClick={() => document.getElementById('college-certificate').click()}
                          >
                            Change
                          </button>
                        </div>
                        <input
                          id="college-certificate"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, "college", "certificate")}
                          hidden
                        />
                      </div>
                    ) : (
                      <label className={styles.uploadButton}>
                        <FaUpload /> Upload Certificate
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload(e, "college", "certificate")}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details Section */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Bank Details</h2>
              <button
                className={`${styles.editButton} ${editableSections.bank ? styles.save : styles.edit}`}
                onClick={() => editableSections.bank 
                  ? handleSectionSave('bank')
                  : toggleSectionEdit('bank')
                }
              >
                {editableSections.bank ? (
                  <>
                    <FaSave /> Save
                  </>
                ) : (
                  <>
                    <FaEdit /> Edit
                  </>
                )}
              </button>
            </div>
            <div className={styles.sectionGrid}>
              <div className={`${styles.inputGroup} ${!editableSections.bank ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>Bank Name</label>
                <div className={`${styles.inputWrapper} ${editableSections.bank ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter bank name"
                    value={employeeData.bankDetails.bankName}
                    onChange={(e) => handleChange(e, null, "bankName")}
                    disabled={!editableSections.bank}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.bank ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>Account Number</label>
                <div className={`${styles.inputWrapper} ${editableSections.bank ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    value={employeeData.bankDetails.accountNumber}
                    onChange={(e) => handleChange(e, null, "accountNumber")}
                    disabled={!editableSections.bank}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.bank ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>IFSC Code</label>
                <div className={`${styles.inputWrapper} ${editableSections.bank ? styles.editable : ''}`}>
                  <input
                    type="text"
                    placeholder="Enter IFSC code"
                    value={employeeData.bankDetails.ifscCode}
                    onChange={(e) => handleChange(e, null, "ifscCode")}
                    disabled={!editableSections.bank}
                  />
                </div>
              </div>
              <div className={`${styles.inputGroup} ${!editableSections.bank ? styles.disabled : ''}`}>
                <label className={`${styles.label} ${styles.required}`}>Account Type</label>
                <div className={`${styles.inputWrapper} ${editableSections.bank ? styles.editable : ''}`}>
                  <select
                    value={employeeData.bankDetails.accountType}
                    onChange={(e) => handleChange(e, null, "accountType")}
                    disabled={!editableSections.bank}
                  >
                    <option value="">Select account type</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;

import React, { useState,useEffect,useContext } from 'react';
import './ApplicationForm.css';
import axios from 'axios';
// import Sidebar from '../../../components/Sidebar';
import FormFrame from '../../../svgs/FormFrame.svg';
import NavBar from '../../../components/navbar/navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../../context/AuthContext';
import useAxiosPrivate from '../../../utils/useAxiosPrivate';

const REACT_APP_BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL || "http://localhost:8000"

function Ambassador() {
  const [formData, setformData] = useState({
    email:"",
    name:"",
    gender:"",
    college:"",
    year:"",
    mobile_number:"",
    whatsapp_number:"",
    postal_address:"",
    pincode:"",
    pass2:"",
    confirm_password:"",
    reason:"",
  })
  const [requesting, setRequesting] = useState(false)
  const navigator = useNavigate();

  const { userInfo, authTokens } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if( userInfo ){
      if(userInfo.ca_id){
        navigator("/ca/leaderboard");
      } else {
        setformData({
          ...formData,
          "email": userInfo.email,
          "name":userInfo.full_name,
          "gender":userInfo.gender,
          "college":userInfo.college,
          "year":userInfo.year,
          "mobile_number":userInfo.mobile_number,
          "pass2": "password",
          "confirm_password": "password"
        })
      }
    }
  }, [])
  

  const handleChange = (e) => {
    setformData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(isNaN(formData.year)){
      alert("Year must be a number!");
      return;
    }
    if(isNaN(formData.mobile_number)){
      alert("Mobile Number must be a number!");
      return;
    }
    if(isNaN(formData.whatsapp_number)){
      alert("Whatsapp number must be a number!");
      return;
    }
    if(isNaN(formData.pincode)){
      alert("Pincode must be a number!");
      return;
    }


    setRequesting(true)
    // console.log(formData)
    if(formData.pass2 === formData.confirm_password){
      
      try {
      let response = {}
      if(userInfo) {
          response = await axiosPrivate.post(
          `${REACT_APP_BASE_BACKEND_URL}/create_ca/`,formData,{
          headers: {
            'Content-Type':'application/json',
        }})
      }
      else {
          response = await axios.post(
          `${REACT_APP_BASE_BACKEND_URL}/create_ca/`,formData,{
          headers: {
            'Content-Type':'application/json',
        }})
      }
      
      if (response.status === 201){
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        if(userInfo) {
          toast.success("Login again to access ambassador dashboard!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        navigator("/ca")
      } 
      else if (response.status === 406){
        toast.error(response.data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } 
      else if (response.status === 226){
        toast.error(response.data.msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setRequesting(false)
    }
      catch(error) {
        toast.error('Server Error! Try again later.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        
          setRequesting(false)
      }
    } 
    else{
      alert("password and confirm password should be same")
      setRequesting(false)
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-shrink-0">
        <div className="main-application flex flex-col w-[100%]">
          <div className="form-frame">
          <img 
              src={FormFrame} 
              alt="Frame" />
          <div className="svg">

          </div>
          <div className="main-form">
            <div className="form">
              <h3>Campus Ambassador Application</h3>
              <form onSubmit={handleSubmit}>
                <div className="element">
                  <label htmlFor="email">E-Mail:</label>
                  <input type="text" name='email' onChange={handleChange} placeholder="Email" value={userInfo?userInfo.email:null} disabled={userInfo?true:false} required={true}/>
                </div>
                <div className="element">
                  <label htmlFor="name">Name:</label>
                  <input type="text" name='name' onChange={handleChange} placeholder="Name" value={userInfo?userInfo.full_name:null} disabled={userInfo?true:false} required={true}/>
                </div>
                <div className="element">
                  <label htmlFor="Gender">Gender:</label>
                  <input name="gender" placeholder="Gender" list="genders" onChange={handleChange} value={userInfo?userInfo.gender:null} disabled={userInfo?true:false} required={true}/>
                  <datalist id="genders">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </datalist>
                </div>
                <div className="element">
                  <label htmlFor="College">College:</label>
                  <input type="text" id="id_college" name="college" placeholder="College" list="all_colleges" onChange={handleChange} disabled={userInfo?true:false} value={userInfo?userInfo.college:null} required={true}/>
                    <datalist id="all_colleges">
                      <option value="AAA COLLEGE OF ENGINEERING AND TECHNOLOGY">AAA COLLEGE OF ENGINEERING AND TECHNOLOGY</option>
                      <option value="AARVAVART INSTITUTE OF TECHNOLOGY AND MANAGEMENT, LUCKNOW">AARVAVART INSTITUTE OF TECHNOLOGY AND MANAGEMENT, LUCKNOW</option>
                      <option value="ABES ENGINEERING COLLEGE, GHAZIABAD">ABES ENGINEERING COLLEGE, GHAZIABAD</option>
                      <option value="ABV-IIITM, GWALIOR">ABV-IIITM, GWALIOR</option>
                      <option value="ADITYA INSTITUTE OF TECHNOLOGY, MADANAPALLE">ADITYA INSTITUTE OF TECHNOLOGY, MADANAPALLE</option>
                      <option value="AGRICULTURAL COLLEGE HASSAN, BANGALORE">AGRICULTURAL COLLEGE HASSAN, BANGALORE</option>
                      <option value="AISSMS, PUNE">AISSMS, PUNE</option>
                      <option value="AITM, VARANASI">AITM, VARANASI</option>
                      <option value="AJAY KUMAR GARG ENGINEERING COLLEGE, GHAZIABAD">AJAY KUMAR GARG ENGINEERING COLLEGE, GHAZIABAD</option>
                      <option value="AKS UNIVERSITY, SATNA">AKS UNIVERSITY, SATNA</option>
                      <option value="AMBALIKA INSTITUTE OF MANAGEMENT AND TECHNOLOGY, LUCKNOW">AMBALIKA INSTITUTE OF MANAGEMENT AND TECHNOLOGY, LUCKNOW</option>
                      <option value="AMITY SCHOOL OF ENGINEERING AND TECHNOLOGY, GWALIOR">AMITY SCHOOL OF ENGINEERING AND TECHNOLOGY, GWALIOR</option>
                      <option value="AMITY UNIVERSITY, LUCKNOW">AMITY UNIVERSITY, LUCKNOW</option>
                      <option value="AMITY UNIVERSITY, MADHYA PRADESH">AMITY UNIVERSITY, MADHYA PRADESH</option>
                      <option value="AMITY UNIVERSITY, RAJASTHAN">AMITY UNIVERSITY, RAJASTHAN</option>
                      <option value="AMRAPALI GROUP OF INSTITTUTE, HALDWANI">AMRAPALI GROUP OF INSTITTUTE, HALDWANI</option>
                      <option value="AMRAVATI ENGINEERING COLLEGE">AMRAVATI ENGINEERING COLLEGE</option>
                      <option value="AMRITA SCHOOL OF ENGINEERING, AMRITAPURI">AMRITA SCHOOL OF ENGINEERING, AMRITAPURI</option>
                      <option value="AMRITA SCHOOL OF ENGINEERING, BANGALORE">AMRITA SCHOOL OF ENGINEERING, BANGALORE</option>
                      <option value="AMRITA VISHWA VIDYAPEETHAM (AMRITA UNIVERSITY), AMRITAPURI, KOLLAM, KERALA">AMRITA VISHWA VIDYAPEETHAM (AMRITA UNIVERSITY), AMRITAPURI, KOLLAM, KERALA</option>
                      <option value="AMRITSAR COLLEGE OF ENGINEERING AND TECHNOLOGY, PUNJAB">AMRITSAR COLLEGE OF ENGINEERING AND TECHNOLOGY, PUNJAB</option>
                      <option value="ANAND ENGINEERING COLLEGE (AEC) , AGRA">ANAND ENGINEERING COLLEGE (AEC) , AGRA</option>
                      <option value="ANDHRA LOYOLA COLLEGE, VIJAYAWADA">ANDHRA LOYOLA COLLEGE, VIJAYAWADA</option>
                      <option value="ANDHRA UNIVERSITY, VISAKHAPATNAM">ANDHRA UNIVERSITY, VISAKHAPATNAM</option>
                      <option value="ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY AND SCIENCES, VISHAKHAPATNAM">ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY AND SCIENCES, VISHAKHAPATNAM</option>
                      <option value="ANURAG COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD">ANURAG COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD</option>
                      <option value="ARAVALI COLLEGE OF ENGINEERING AND MANAGEMENT, FARIDABAD">ARAVALI COLLEGE OF ENGINEERING AND MANAGEMENT, FARIDABAD</option>
                      <option value="ARENA ANIMATION BHELUPUR, VARANASI">ARENA ANIMATION BHELUPUR, VARANASI</option>
                      <option value="ARMY INSTITUTE OF TECHNOLOGY (AIT), PUNE">ARMY INSTITUTE OF TECHNOLOGY (AIT), PUNE</option>
                      <option value="ARYA COLLEGE OF ENGINEERING AND IT, JAIPUR">ARYA COLLEGE OF ENGINEERING AND IT, JAIPUR</option>
                      <option value="ARYA COLLEGE OF ENGINEERING AND RESEARCH CENTRE, RAJASTHAN">ARYA COLLEGE OF ENGINEERING AND RESEARCH CENTRE, RAJASTHAN</option>
                      <option value="ARYA MAHILA PG COLLEGE, VARANASI">ARYA MAHILA PG COLLEGE, VARANASI</option>
                      <option value="ARYA MAHILA POST GRADUATE COLLEGE, BHU">ARYA MAHILA POST GRADUATE COLLEGE, BHU</option>
                      <option value="ARYAVART INSTITUTE OF TECHNOLOGY AND MANAGEMENT, LUCKNOW">ARYAVART INSTITUTE OF TECHNOLOGY AND MANAGEMENT, LUCKNOW</option>
                      <option value="ASSAM UNIVERSITY">ASSAM UNIVERSITY</option>
                      <option value="ASANSOL ENGINEERING COLLEGE">ASANSOL ENGINEERING COLLEGE</option>
                      <option value="ASHOKA INSTITUTE OF TECHNOLOGY AND MANAGEMENT, VARANASI">ASHOKA INSTITUTE OF TECHNOLOGY AND MANAGEMENT, VARANASI</option>
                      <option value="ASSAM DON BOSCO UNIVERSITY - AZARA CAMPUS , GUWAHATI">ASSAM DON BOSCO UNIVERSITY - AZARA CAMPUS , GUWAHATI</option>
                      <option value="ASSAM ENGINEERING COLLEGE, GUWAHATI">ASSAM ENGINEERING COLLEGE, GUWAHATI</option>
                      <option value="ASUTOSH COLLEGE, KOLKATA">ASUTOSH COLLEGE, KOLKATA</option>
                      <option value="AZAD INSTITUTE OF ENGINEERING AND TECHNOLOGY, LUCKNOW">AZAD INSTITUTE OF ENGINEERING AND TECHNOLOGY, LUCKNOW</option>
                      <option value="B V BHOOMARADDI COLLEGE OF ENGINEERING AND TECHNOLOGY, HUBLI">B V BHOOMARADDI COLLEGE OF ENGINEERING AND TECHNOLOGY, HUBLI</option>
                      <option value="BABASAHEB BHIMRAO AMBEDKAR UNIVERSITY (BBAU) , LUCKNOW">BABASAHEB BHIMRAO AMBEDKAR UNIVERSITY (BBAU) , LUCKNOW</option>
                      <option value="BABU BANARASI DAS NATIONAL INSTITUTE OF TECHNOLOGY AND MANAGEMENT (BBDNITM)">BABU BANARASI DAS NATIONAL INSTITUTE OF TECHNOLOGY AND MANAGEMENT (BBDNITM)</option>
                      <option value="BABU BANARSI DAS INSTITUTE OF TECHNOLOGY (BBDIT)">BABU BANARSI DAS INSTITUTE OF TECHNOLOGY (BBDIT)</option>
                      <option value="BABU BANARSI DAS UNIVERSITY (BBDU), LUCKNOW">BABU BANARSI DAS UNIVERSITY (BBDU), LUCKNOW</option>
                      <option value="BABULAL TARABAI INSTITUTE OF RESEARCH AND TECHNOLOGY (BTIRT), SAGAR">BABULAL TARABAI INSTITUTE OF RESEARCH AND TECHNOLOGY (BTIRT), SAGAR</option>
                      <option value="BAGLA DEGREE COLLEGE, HATHRAS">BAGLA DEGREE COLLEGE, HATHRAS</option>
                      <option value="BALLARI INSTITUTE OF TECHNOLOGY AND MANAGEMENT">BALLARI INSTITUTE OF TECHNOLOGY AND MANAGEMENT</option>
                      <option value="BANARAS HINDU UNIVERSITY (BHU)">BANARAS HINDU UNIVERSITY (BHU)</option>
                      <option value="BANASTHALI UNIVERSITY">BANASTHALI UNIVERSITY</option>
                      <option value="BANGALORE INSTITUTE OF TECHNOLOGY">BANGALORE INSTITUTE OF TECHNOLOGY</option>
                      <option value="BANSAL INSTITUTE OF SCIENCE AND TECHNOLOGY, BHOPAL">BANSAL INSTITUTE OF SCIENCE AND TECHNOLOGY, BHOPAL</option>
                      <option value="BAREILLY COLLEGE">BAREILLY COLLEGE</option>
                      <option value="BBDEC, LUCKNOW">BBDEC, LUCKNOW</option>
                      <option value="BBSBEC, FGS SANGRUR">BBSBEC, FGS SANGRUR</option>
                      <option value="BBSCET, ALLAHABAD">BBSCET, ALLAHABAD</option>
                      <option value="BCE, BHAGALPUR">BCE, BHAGALPUR</option>
                      <option value="BEANT COLLEGE OF ENGINEERING AND TECHNOLOGY, GURDASPUR">BEANT COLLEGE OF ENGINEERING AND TECHNOLOGY, GURDASPUR</option>
                      <option value="BELIEVERS CHURCH CAARMEL ENGINEERING COLLEGE, PATHANAMTHITTA">BELIEVERS CHURCH CAARMEL ENGINEERING COLLEGE, PATHANAMTHITTA</option>
                      <option value="BENGAL COLLEGE ENGNEERING AND TECHNOLOGY, DURGAPUR">BENGAL COLLEGE ENGNEERING AND TECHNOLOGY, DURGAPUR</option>
                      <option value="BHABHA COLLEGE OF ENGINEERING, KANPUR">BHABHA COLLEGE OF ENGINEERING, KANPUR</option>
                      <option value="BHABHA INSTITUTE OF TECHNOLOGY (BIT), KANPUR">BHABHA INSTITUTE OF TECHNOLOGY (BIT), KANPUR</option>
                      <option value="BHAGALPUR COLLEGE OF ENGINEERING">BHAGALPUR COLLEGE OF ENGINEERING</option>
                      <option value="BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY, DELHI">BHAGWAN PARSHURAM INSTITUTE OF TECHNOLOGY, DELHI</option>
                      <option value="BHARATH UNIVERSITY , CHENNAI">BHARATH UNIVERSITY , CHENNAI</option>
                      <option value="BHARATI VIDYAPEETH COLLEGE OF ENGINEERING, NIHAL VIHAR">BHARATI VIDYAPEETH COLLEGE OF ENGINEERING, NIHAL VIHAR</option>
                      <option value="BHARATI VIDYAPEETH COLLEGE OF ENGINEERING, PUNE">BHARATI VIDYAPEETH COLLEGE OF ENGINEERING, PUNE</option>
                      <option value="BHASKARACHARYA COLLEGE OF APPLIED SCIENCE, DELHI">BHASKARACHARYA COLLEGE OF APPLIED SCIENCE, DELHI</option>
                      <option value="BHILAI INSTITUTE OF TECHNOLOGY (BIT) , DURG">BHILAI INSTITUTE OF TECHNOLOGY (BIT) , DURG</option>
                      <option value="BHILAI INSTITUTE OF TECHNOLOGY (BIT) , RAIPUR">BHILAI INSTITUTE OF TECHNOLOGY (BIT) , RAIPUR</option>
                      <option value="BHUBANESWAR ENGINEERING COLLEGE">BHUBANESWAR ENGINEERING COLLEGE</option>
                      <option value="BHUNDELKHAND INSTITUTE OF ENGINEERING AND TECHNOLOGY, JHANSI">BHUNDELKHAND INSTITUTE OF ENGINEERING AND TECHNOLOGY, JHANSI</option>
                      <option value="BIET, SIKAR">BIET, SIKAR</option>
                      <option value="BIPIN CHANDRA TRIPATHI KUMAON ENGINEERING COLLEGE, HALDWANI">BIPIN CHANDRA TRIPATHI KUMAON ENGINEERING COLLEGE, HALDWANI</option>
                      <option value="BIPIN TRIPATHI KUMAON INSTITUTE OF TECHNOLOGY, DWARAHAT (ALMORA)">BIPIN TRIPATHI KUMAON INSTITUTE OF TECHNOLOGY, DWARAHAT (ALMORA)</option>
                      <option value="BIRBHUM INSTITUTE OF ENGINEERING AND TECHNOLOGY, SURI">BIRBHUM INSTITUTE OF ENGINEERING AND TECHNOLOGY, SURI</option>
                      <option value="BIRLA INSTITUTE OF TECHNOLOGY (BIT), MESRA RANCHI">BIRLA INSTITUTE OF TECHNOLOGY (BIT), MESRA RANCHI</option>
                      <option value="BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE (BITS), PILANI GOA">BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE (BITS), PILANI GOA</option>
                      <option value="BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE (BITS), PILANI HYDERABAD">BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE (BITS), PILANI HYDERABAD</option>
                      <option value="BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE (BITS), PILANI">BIRLA INSTITUTE OF TECHNOLOGY AND SCIENCE (BITS), PILANI</option>
                      <option value="BIT MESRA (PATNA CAMPUS)">BIT MESRA (PATNA CAMPUS)</option>
                      <option value="BIT SINDRI DHANBAD">BIT SINDRI DHANBAD</option>
                      <option value="BK BIRLA INSTITUTE OF ENGINEERING AND TECHNOLOGY (BKBIET) , PILANI">BK BIRLA INSTITUTE OF ENGINEERING AND TECHNOLOGY (BKBIET) , PILANI</option>
                      <option value="BML MUNJAL UNIVERSITY, GURGAON">BML MUNJAL UNIVERSITY, GURGAON</option>
                      <option value="BMSIT, BANGALORE">BMSIT, BANGALORE</option>
                      <option value="BRCM COLLEGE OF ENGINEERING AND TECHNOLOGY BAHAL, BHIWANI">BRCM COLLEGE OF ENGINEERING AND TECHNOLOGY BAHAL, BHIWANI</option>
                      <option value="BSACET, MATHURA">BSACET, MATHURA</option>
                      <option value="BTKIT DWARAHAT, KASHIPUR">BTKIT DWARAHAT, KASHIPUR</option>
                      <option value="BUDDHA INSTITUTE OF TECHNOLOGY, GORAKHPUR">BUDDHA INSTITUTE OF TECHNOLOGY, GORAKHPUR</option>
                      <option value="BUNDELKHAD INSTITUTE OF ENGINEERING AND TECHNOLOGY (BIET), JHANSI">BUNDELKHAD INSTITUTE OF ENGINEERING AND TECHNOLOGY (BIET), JHANSI</option>
                      <option value="BUNDELKHAND UNIVERSITY, JHANSI">BUNDELKHAND UNIVERSITY, JHANSI</option>
                      <option value="C V RAMAN COLLEGE OF ENGINEERING (CVRCE), BHUBANESWAR">C V RAMAN COLLEGE OF ENGINEERING (CVRCE), BHUBANESWAR</option>
                      <option value="CAMBRIDGE INSTITUTE OF TECHNOLOGY, TATISILWAI">CAMBRIDGE INSTITUTE OF TECHNOLOGY, TATISILWAI</option>
                      <option value="CCET, BHILAI">CCET, BHILAI</option>
                      <option value="CENTRAL UNIVERSITY OF JHARKHAND (CUJ) , RANCHI">CENTRAL UNIVERSITY OF JHARKHAND (CUJ) , RANCHI</option>
                      <option value="CENTRAL UNIVERSITY OF KARNATAKA">CENTRAL UNIVERSITY OF KARNATAKA</option>
                      <option value="CENTRAL UNIVERSITY OF PUNJAB">CENTRAL UNIVERSITY OF PUNJAB</option>
                      <option value="CENTRAL UNIVERSITY OF SOUTH BIHAR">CENTRAL UNIVERSITY OF SOUTH BIHAR</option>
                      <option value="CENTRAL UNIVERSITY, BILASPUR">CENTRAL UNIVERSITY, BILASPUR</option>
                      <option value="CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT, BHUBANESWAR">CENTURION UNIVERSITY OF TECHNOLOGY AND MANAGEMENT, BHUBANESWAR</option>
                      <option value="CH DEVI LAL STATE INSTITUTE OF ENGINEERING AND TECHNOLOGY">CH DEVI LAL STATE INSTITUTE OF ENGINEERING AND TECHNOLOGY</option>
                      <option value="CHANDIGARH ENGINEERING COLLEGE">CHANDIGARH ENGINEERING COLLEGE</option>
                      <option value="CHANDIGARH GROUP OF COLLEGES">CHANDIGARH GROUP OF COLLEGES</option>
                      <option value="CHANDIGARH UNIVERSITY">CHANDIGARH UNIVERSITY</option>
                      <option value="CHHATRAPATI SHAHU JI MAHARAJ UNIVERSITY (CSJMU) , KANPUR">CHHATRAPATI SHAHU JI MAHARAJ UNIVERSITY (CSJMU) , KANPUR</option>
                      <option value="CHIRALA ENGINNERING COLLEGE">CHIRALA ENGINNERING COLLEGE</option>
                      <option value="CHITKARA UNIVERSITY">CHITKARA UNIVERSITY</option>
                      <option value="CHRIST THE KING COLLEGE, JHANSI">CHRIST THE KING COLLEGE, JHANSI</option>
                      <option value="CHRIST UNIVERSITY, BANGALORE">CHRIST UNIVERSITY, BANGALORE</option>
                      <option value="CHRISTIAN COLLEGE OF ENGINEERING AND TECHNOLOGY, BHILAI">CHRISTIAN COLLEGE OF ENGINEERING AND TECHNOLOGY, BHILAI</option>
                      <option value="CIMAGE COLLEGE, PATNA">CIMAGE COLLEGE, PATNA</option>
                      <option value="CMP DEGREE COLLEGE, ALLAHABAD">CMP DEGREE COLLEGE, ALLAHABAD</option>
                      <option value="CMR TECHNICAL CAMPUS, HYDERABAD">CMR TECHNICAL CAMPUS, HYDERABAD</option>
                      <option value="COCHIN UNIVERSITY OF SCIENCE AND TECHNOLOGY">COCHIN UNIVERSITY OF SCIENCE AND TECHNOLOGY</option>
                      <option value="COLLEGE OF AGRICULTURAL ENGINEERING JNKVV JABALPUR">COLLEGE OF AGRICULTURAL ENGINEERING JNKVV JABALPUR</option>
                      <option value="COLLEGE OF ENGINEERING, ROORKEE">COLLEGE OF ENGINEERING, ROORKEE</option>
                      <option value="COLLEGE OF ENGINEERING CHENGANNUR, KERALA">COLLEGE OF ENGINEERING CHENGANNUR, KERALA</option>
                      <option value="CSIR-NATIONAL AEROSPACE LABORATORIES">CSIR-NATIONAL AEROSPACE LABORATORIES</option>
                      <option value="CSIT, DURG">CSIT, DURG</option>
                      <option value="CTAE, UDAIPUR">CTAE, UDAIPUR</option>
                      <option value="CU SHAH COMMERCE COLLEGE, AHMEDABAD">CU SHAH COMMERCE COLLEGE, AHMEDABAD</option>
                      <option value="CUMMINS COLLEGE OF ENGINEERING FOR WOMEN, NAGPUR">CUMMINS COLLEGE OF ENGINEERING FOR WOMEN, NAGPUR</option>
                      <option value="CUMMINS COLLEGE OF ENGINEERING FOR WOMEN, PUNE">CUMMINS COLLEGE OF ENGINEERING FOR WOMEN, PUNE</option>
                      <option value="CVSR COLLEGE OF ENGINEERING, HYDERABAD">CVSR COLLEGE OF ENGINEERING, HYDERABAD</option>
                      <option value="DAHANUAKAR COLLEGE, MUMBAI">DAHANUAKAR COLLEGE, MUMBAI</option>
                      <option value="DAV PG COLLEGE, VARANASI">DAV PG COLLEGE, VARANASI</option>
                      <option value="DAYALBAGH EDUCATIONAL INSTITUTE, AGRA">DAYALBAGH EDUCATIONAL INSTITUTE, AGRA</option>
                      <option value="DAYANADA SAGAR COLLEGE OF ENGINEERING, BANGALORE">DAYANADA SAGAR COLLEGE OF ENGINEERING, BANGALORE</option>
                      <option value="DEEN DAYAL UPADHYAYA COLLEGE (DDUC), DELHI">DEEN DAYAL UPADHYAYA COLLEGE (DDUC), DELHI</option>
                      <option value="DELHI INSTITUTE OF TOOL ENGINEERING , DELHI">DELHI INSTITUTE OF TOOL ENGINEERING , DELHI</option>
                      <option value="DELHI TECHNICAL CAMPUS">DELHI TECHNICAL CAMPUS</option>
                      <option value="DELHI TECHNOLOGICAL UNIVERSITY (DTU)">DELHI TECHNOLOGICAL UNIVERSITY (DTU)</option>
                      <option value="DES'S COLLEGE OF ENGINEERING AND TECHNOLOGY (DESCOET), DHAMANGAON">DES'S COLLEGE OF ENGINEERING AND TECHNOLOGY (DESCOET), DHAMANGAON</option>
                      <option value="DEVPYAG INSTITUTE OF TECHNICAL STUDIES">DEVPYAG INSTITUTE OF TECHNICAL STUDIES</option>
                      <option value="DEWAN VS INSTITUTE OF ENGINEERING AND TECHNOLOGY, MEERUT">DEWAN VS INSTITUTE OF ENGINEERING AND TECHNOLOGY, MEERUT</option>
                      <option value="DIT UNIVERSITY, DEHRADUN">DIT UNIVERSITY, DEHRADUN</option>
                      <option value="DKTE'S TEXTILE AND ENGINEERING INSTITUDE, ICHALKARANJI">DKTE'S TEXTILE AND ENGINEERING INSTITUDE, ICHALKARANJI</option>
                      <option value="DR B C ROY ENGINEERING COLLEGE, DURGAPUR">DR B C ROY ENGINEERING COLLEGE, DURGAPUR</option>
                      <option value="DR B R AMBEDKAR NIT JALANDHAR">DR B R AMBEDKAR NIT JALANDHAR</option>
                      <option value="DR DY PATIL INSTITUTE OF ENGINEERING AND TECHNOLOGY, PUNE">DR DY PATIL INSTITUTE OF ENGINEERING AND TECHNOLOGY, PUNE</option>
                      <option value="DR MC SAXENA GROUP OF COLLEGES, LUCKNOW">DR MC SAXENA GROUP OF COLLEGES, LUCKNOW</option>
                      <option value="DR RAM MANOHAR LOHIA NATIONAL LAW UNIVERSITY, LUCKNOW">DR RAM MANOHAR LOHIA NATIONAL LAW UNIVERSITY, LUCKNOW</option>
                      <option value="DRONACHARYA COLLEGE OF ENGINEERING, GURUGRAM">DRONACHARYA COLLEGE OF ENGINEERING, GURUGRAM</option>
                      <option value="DYAL SINGH COLLEGE, NEW DELHI">DYAL SINGH COLLEGE, NEW DELHI</option>
                      <option value="EWING CHRISTIAN COLLEGE, ALLAHABAD">EWING CHRISTIAN COLLEGE, ALLAHABAD</option>
                      <option value="FACULTY OF COMMERCE (FOC) BHU">FACULTY OF COMMERCE (FOC) BHU</option>
                      <option value="FACULTY OF ENGINEERING (FET) AGRA COLLEGE, AGRA">FACULTY OF ENGINEERING (FET) AGRA COLLEGE, AGRA</option>
                      <option value="FACULTY OF MANAGEMENT STUDIES (FMS) BHU">FACULTY OF MANAGEMENT STUDIES (FMS) BHU</option>
                      <option value="FACULTY OF SOCIAL SCIENCE (FSS) BHU">FACULTY OF SOCIAL SCIENCE (FSS) BHU</option>
                      <option value="FEDERAL POLYTECHNIC, ILARO">FEDERAL POLYTECHNIC, ILARO</option>
                      <option value="FEROZE GANDHI INSTITUTE OF ENGINEERING AND TECHNOLOGY, RAEBARELI">FEROZE GANDHI INSTITUTE OF ENGINEERING AND TECHNOLOGY, RAEBARELI</option>
                      <option value="FUTURE INSTITUTE OF ENGINEERING AND TECHNOLOGY (FUTUREIET) , BAREILLY">FUTURE INSTITUTE OF ENGINEERING AND TECHNOLOGY (FUTUREIET) , BAREILLY</option>
                      <option value="FUTURE INSTITUTE OF ENGINEERING AND MANAGEMENT, KOLKATA">FUTURE INSTITUTE OF ENGINEERING AND MANAGEMENT, KOLKATA</option>
                      <option value="G L BAJAJ INSTITUTE OF TECHNOLOGY AND MANAGEMENT, GREATER NOIDA">G L BAJAJ INSTITUTE OF TECHNOLOGY AND MANAGEMENT, GREATER NOIDA</option>
                      <option value="G S B V LAXMI NAGAR">G S B V LAXMI NAGAR</option>
                      <option value="G.S.MANDAL'S MAHARSHTRA INSTITUTE OF TECHNOLOGY, AURANGABAD">G.S.MANDAL'S MAHARSHTRA INSTITUTE OF TECHNOLOGY, AURANGABAD</option>
                      <option value="GALGOTIA COLLEGE OF ENGINEERING AND TECHNOLOGY, GREATER NOIDA">GALGOTIA COLLEGE OF ENGINEERING AND TECHNOLOGY, GREATER NOIDA</option>
                      <option value="GALGOTIAS UNIVERSITY">GALGOTIAS UNIVERSITY</option>
                      <option value="GANDHI ENGINEERING COLLEGE, BHUBANESWAR">GANDHI ENGINEERING COLLEGE, BHUBANESWAR</option>
                      <option value="GANDHI INSTITUTE FOR EDUCATION AND TECHNOLOGY, ORISSA">GANDHI INSTITUTE FOR EDUCATION AND TECHNOLOGY, ORISSA</option>
                      <option value="GANDHI INSTITUTE FOR TECHNOLOGICAL ADVANCEMENT (GITA), BHUBANESWAR">GANDHI INSTITUTE FOR TECHNOLOGICAL ADVANCEMENT (GITA), BHUBANESWAR</option>
                      <option value="GARGI COLLEGE, NEW DELHI">GARGI COLLEGE, NEW DELHI</option>
                      <option value="GAURIHAR PLOYTECHNIC, SATARA">GAURIHAR PLOYTECHNIC, SATARA</option>
                      <option value="GAUTAM BUDDHA UNIVERSITY (GBU), NOIDA">GAUTAM BUDDHA UNIVERSITY (GBU), NOIDA</option>
                      <option value="GAYA COLLEGE OF ENGINEERING, GAYA">GAYA COLLEGE OF ENGINEERING, GAYA</option>
                      <option value="GAYATRI VIDYA PARISHAD COLLEGE OF ENGINEERING (A), VISAKHAPATNAM">GAYATRI VIDYA PARISHAD COLLEGE OF ENGINEERING (A), VISAKHAPATNAM</option>
                      <option value="GD RUNGTA COLLEGE OF ENGINEERING AND TECHNOLOGY (GDRCET) , BHILAI">GD RUNGTA COLLEGE OF ENGINEERING AND TECHNOLOGY (GDRCET) , BHILAI</option>
                      <option value="GIET, GUNUPUR">GIET, GUNUPUR</option>
                      <option value="GIRIJANANDA INSTITUTE OF MANAGEMENT AND TECHNOLOGY, GUWAHATI">GIRIJANANDA INSTITUTE OF MANAGEMENT AND TECHNOLOGY, GUWAHATI</option>
                      <option value="GITAM UNIVERSITY, VISAKHAPATNAM">GITAM UNIVERSITY, VISAKHAPATNAM</option>
                      <option value="GEETHANJALI COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD">GEETHANJALI COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD</option>
                      <option value="GLA UNIVERSITY, MATHURA">GLA UNIVERSITY, MATHURA</option>
                      <option value="GLORIOUS ACADEMY, VARANASI">GLORIOUS ACADEMY, VARANASI</option>
                      <option value="GMR INSTITUTE OF TECHNOLOGY, RAZAM">GMR INSTITUTE OF TECHNOLOGY, RAZAM</option>
                      <option value="GOEL INSTITUTE OF TECHNOLOGY AND MANAGEMENT, LUCKNOW">GOEL INSTITUTE OF TECHNOLOGY AND MANAGEMENT, LUCKNOW</option>
                      <option value="GOURIHAR POLYTECHNIC, SATARA">GOURIHAR POLYTECHNIC, SATARA</option>
                      <option value="GOVERNMENT COLLEGE OF ENGINEERING AND LEATHER TECHNOLOGY, KOLKATA">GOVERNMENT COLLEGE OF ENGINEERING AND LEATHER TECHNOLOGY, KOLKATA</option>
                      <option value="GOVERNMENT COLLEGE OF ENGINEERING AND TECHNOLOGY, BIKANER">GOVERNMENT COLLEGE OF ENGINEERING AND TECHNOLOGY, BIKANER</option>
                      <option value="GOVERNMENT COLLEGE OF ENGINEERING KALAHANDI, BHAWANIPATNA">GOVERNMENT COLLEGE OF ENGINEERING KALAHANDI, BHAWANIPATNA</option>
                      <option value="GOVERNMENT COLLEGE OF ENGINEERING, KARAD">GOVERNMENT COLLEGE OF ENGINEERING, KARAD</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) AJMER">GOVERNMENT ENGINEERING COLLEGE (GEC) AJMER</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) AURANGABAD">GOVERNMENT ENGINEERING COLLEGE (GEC) AURANGABAD</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) AZAMGARH">GOVERNMENT ENGINEERING COLLEGE (GEC) AZAMGARH</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) BANDA">GOVERNMENT ENGINEERING COLLEGE (GEC) BANDA</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) BHUJ-KACHCHH">GOVERNMENT ENGINEERING COLLEGE (GEC) BHUJ-KACHCHH</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) BIKANER">GOVERNMENT ENGINEERING COLLEGE (GEC) BIKANER</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) DAHOD">GOVERNMENT ENGINEERING COLLEGE (GEC) DAHOD</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) JAGDALPUR">GOVERNMENT ENGINEERING COLLEGE (GEC) JAGDALPUR</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) NAGPUR">GOVERNMENT ENGINEERING COLLEGE (GEC) NAGPUR</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) RAIPUR">GOVERNMENT ENGINEERING COLLEGE (GEC) RAIPUR</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE (GEC) SONBHADRA">GOVERNMENT ENGINEERING COLLEGE (GEC) SONBHADRA</option>
                      <option value="GOVERNMENT ENGINEERING COLLEGE(REVA GEC), REVA">GOVERNMENT ENGINEERING COLLEGE(REVA GEC), REVA</option>
                      <option value="GOVERNMENT MAHARAJA COLLEGE, CHHATARPUR">GOVERNMENT MAHARAJA COLLEGE, CHHATARPUR</option>
                      <option value="GOVERNMENT COLLEGE OF ENGINEERING AND RESEARCH, AVASARI KHURD">GOVERNMENT COLLEGE OF ENGINEERING AND RESEARCH, AVASARI KHURD</option>
                      <option value="GOVERNMENT MODEL ENGINEERING COLLEGE (MEC) , KOCHI">GOVERNMENT MODEL ENGINEERING COLLEGE (MEC) , KOCHI</option>
                      <option value="GOVIND BALLABH PANT ENGINEERING COLLEGE, GARHWAL">GOVIND BALLABH PANT ENGINEERING COLLEGE, GARHWAL</option>
                      <option value="GOVT POLYTECHNIC COLLEGE, NASRULLAGAN">GOVT POLYTECHNIC COLLEGE, NASRULLAGAN</option>
                      <option value="GOVT WOMEN ENGINEERING COLLEGE (GWECA), AJMER">GOVT WOMEN ENGINEERING COLLEGE (GWECA), AJMER</option>
                      <option value="GRAPHIC ERA HILL UNIVERSITY, NAINITAL">GRAPHIC ERA HILL UNIVERSITY, NAINITAL</option>
                      <option value="GREATER NOIDA COLLEGE OF TECHNOLOGY">GREATER NOIDA COLLEGE OF TECHNOLOGY</option>
                      <option value="GRT INSTITUTE OF ENGINEERING AND TECHNOLOGY, CHENNAI">GRT INSTITUTE OF ENGINEERING AND TECHNOLOGY, CHENNAI</option>
                      <option value="GURU GHASIDAS CENTRAL UNIVERSITY, BILASPUR">GURU GHASIDAS CENTRAL UNIVERSITY, BILASPUR</option>
                      <option value="GURU GOBIND SINGH INDRAPRASTHA UNIVERSITY, DELHI">GURU GOBIND SINGH INDRAPRASTHA UNIVERSITY, DELHI</option>
                      <option value="GURU NANAK DEV ENGINEERING COLLEGE, LUDHIANA">GURU NANAK DEV ENGINEERING COLLEGE, LUDHIANA</option>
                      <option value="GURUKUL INSTITUTE OF TECHNOLOGY, KOTA">GURUKUL INSTITUTE OF TECHNOLOGY, KOTA</option>
                      <option value="GURUKUL VIDYAPEETH INSTITUTE OF ENGINEERING AND TECHNOLOGY, RAMNAGAR BANUR, PATIALA">GURUKUL VIDYAPEETH INSTITUTE OF ENGINEERING AND TECHNOLOGY, RAMNAGAR BANUR, PATIALA</option>
                      <option value="GURUKULA KANGRI VISWAVIDALAYA, HARIDWAR">GURUKULA KANGRI VISWAVIDALAYA, HARIDWAR</option>
                      <option value="GURUNANAK INSTITUTE OF TECHNOLOGY, KOLKATA">GURUNANAK INSTITUTE OF TECHNOLOGY, KOLKATA</option>
                      <option value="GYAN GANGA COLLEGE OF TECHNOLOGY, JABALPUR">GYAN GANGA COLLEGE OF TECHNOLOGY, JABALPUR</option>
                      <option value="GYAN GANGA INSTITUTE OF TECHNOLOGY AND SCIENCES (GGITS), JABALPUR">GYAN GANGA INSTITUTE OF TECHNOLOGY AND SCIENCES (GGITS), JABALPUR</option>
                      <option value="G. NARAYANAMMA INSTITUTE OF TECHNOLOGY AND SCIENCE, HYDERABAD">G. NARAYANAMMA INSTITUTE OF TECHNOLOGY AND SCIENCE, HYDERABAD</option>
                      <option value="H N B GHARWAL UNIVERSITY, SRINAGAR">H N B GHARWAL UNIVERSITY, SRINAGAR</option>
                      <option value="H R COLLEGE, MUMBAI">H R COLLEGE, MUMBAI</option>
                      <option value="HALDIA INSTITUTE OF TECHNOLOGY">HALDIA INSTITUTE OF TECHNOLOGY</option>
                      <option value="HARCOURT BUTLER TECHNICAL UNIVERSITY (HBTU), KANPUR">HARCOURT BUTLER TECHNICAL UNIVERSITY (HBTU), KANPUR</option>
                      <option value="HERITAGE INSTITUTE OF TECHNOLOGY, KOLKATA">HERITAGE INSTITUTE OF TECHNOLOGY, KOLKATA</option>
                      <option value="HINDUSTAN COLLEGE OF SCIENCE AND TECHNOLOGY, AGRA">HINDUSTAN COLLEGE OF SCIENCE AND TECHNOLOGY, AGRA</option>
                      <option value="HINDUSTAN INSTITUTE OF TECHNOLOGY AND MANAGEMENT, AGRA">HINDUSTAN INSTITUTE OF TECHNOLOGY AND MANAGEMENT, AGRA</option>
                      <option value="HON. SHRI BABANRAO PACHPUTE VICHARDHARA TRUST COLLEGE OF ENGINEERING KASHTI AHMEDNAGAR">HON. SHRI BABANRAO PACHPUTE VICHARDHARA TRUST COLLEGE OF ENGINEERING KASHTI AHMEDNAGAR</option>
                      <option value="IDEAL INSTITUTE OF TECHNOLOGY , GHAZIABAD">IDEAL INSTITUTE OF TECHNOLOGY , GHAZIABAD</option>
                      <option value="IEC COLLEGE OF ENGINEERING AND TECHNOLOGY, GREATER NOIDA">IEC COLLEGE OF ENGINEERING AND TECHNOLOGY, GREATER NOIDA</option>
                      <option value="IES INSTITUTE OF TECHNOLOGY AND MANAGEMENT, BHOPAL">IES INSTITUTE OF TECHNOLOGY AND MANAGEMENT, BHOPAL</option>
                      <option value="IES IPS ACADEMY, INDORE">IES IPS ACADEMY, INDORE</option>
                      <option value="IET INSTITUTE OF ENGINEERING AND TECHNOLOGY, ALWAR">IET INSTITUTE OF ENGINEERING AND TECHNOLOGY, ALWAR</option>
                      <option value="IGNOU , DELHI">IGNOU , DELHI</option>
                      <option value="IGNOU , MUZZAFARPUR">IGNOU , MUZZAFARPUR</option>
                      <option value="IGNOU, BHAGALPUR">IGNOU, BHAGALPUR</option>
                      <option value="IGNOU, LUCKNOW">IGNOU, LUCKNOW</option>
                      <option value="IGNOU, VARANASI">IGNOU, VARANASI</option>
                      <option value="IIIT ALLAHABAD">IIIT ALLAHABAD</option>
                      <option value="IIIT KALYANI">IIIT KALYANI</option>
                      <option value="IIMT ENGINEERING COLLEGE (127) , MEERUT">IIMT ENGINEERING COLLEGE (127) , MEERUT</option>
                      <option value="IISER , BHOPAL">IISER , BHOPAL</option>
                      <option value="IIT BOMBAY">IIT BOMBAY</option>
                      <option value="IIT (BHU) VARANASI">IIT (BHU) VARANASI</option>
                      <option value="IIT (ISM) DHANBAD">IIT (ISM) DHANBAD</option>
                      <option value="IIT BHILAI">IIT BHILAI</option>
                      <option value="IIT BHUBANESWAR">IIT BHUBANESWAR</option>
                      <option value="IIT DELHI">IIT DELHI</option>
                      <option value="IIT DHARWAD">IIT DHARWAD</option>
                      <option value="IIT GANDHINAGAR">IIT GANDHINAGAR</option>
                      <option value="IIT GOA">IIT GOA</option>
                      <option value="IIT GUWAHATI">IIT GUWAHATI</option>
                      <option value="IIT HYDERABAD">IIT HYDERABAD</option>
                      <option value="IIT INDORE">IIT INDORE</option>
                      <option value="IIT JAMMU">IIT JAMMU</option>
                      <option value="IIT JODHPUR">IIT JODHPUR</option>
                      <option value="IIT KANPUR">IIT KANPUR</option>
                      <option value="IIT KHARAGPUR">IIT KHARAGPUR</option>
                      <option value="IIT MADRAS">IIT MADRAS</option>
                      <option value="IIT MANDI">IIT MANDI</option>
                      <option value="IIT PATNA">IIT PATNA</option>
                      <option value="IIT PALAKKAD">IIT PALAKKAD</option>
                      <option value="IIT ROORKEE">IIT ROORKEE</option>
                      <option value="IIT ROPAR">IIT ROPAR</option>
                      <option value="IIT TIRUPATI">IIT TIRUPATI</option>
                      <option value="IMS ENGINEERING COLLEGE, GHAZIABAD">IMS ENGINEERING COLLEGE, GHAZIABAD</option>
                      <option value="INDERPRASTHA ENGINEERING COLLEGE, GHAZIABAD">INDERPRASTHA ENGINEERING COLLEGE, GHAZIABAD</option>
                      <option value="INDIAN INSTITUTE OF ENGINEERING SCIENCE AND TECHNOLOGY (IIEST), SHIBPUR">INDIAN INSTITUTE OF ENGINEERING SCIENCE AND TECHNOLOGY (IIEST), SHIBPUR</option>
                      <option value="INDIAN MARITIME UNIVERSITY, CHENNAI">INDIAN MARITIME UNIVERSITY, CHENNAI</option>
                      <option value="INDIAN MARITIME UNIVERSITY, KOLKATA">INDIAN MARITIME UNIVERSITY, KOLKATA</option>
                      <option value="INDIRA GANDHI INSTITUTE OF TECHNOLOGY, SARANG">INDIRA GANDHI INSTITUTE OF TECHNOLOGY, SARANG</option>
                      <option value="INDUS INSTITUTE OF TECHNOLOGY AND ENGINEERING (INDUS UNIVERSITY)">INDUS INSTITUTE OF TECHNOLOGY AND ENGINEERING (INDUS UNIVERSITY)</option>
                      <option value="INSTITUTE OF CO-OPERATIVE AND CORPORATE MANAGEMENT,RESEARCH AND TRAINING (ICCMRT), LUCKNOW">INSTITUTE OF CO-OPERATIVE AND CORPORATE MANAGEMENT,RESEARCH AND TRAINING (ICCMRT), LUCKNOW</option>
                      <option value="INSTITUTE OF ENGINEERING AND TECHNOLOGY, M.J.P. ROHILKHAND UNIVERSITY, BAREILLY">INSTITUTE OF ENGINEERING AND TECHNOLOGY, M.J.P. ROHILKHAND UNIVERSITY, BAREILLY</option>
                      <option value="INSTITUTE OF ENGINEERING AND MANAGEMENT, KOLKATA">INSTITUTE OF ENGINEERING AND MANAGEMENT, KOLKATA</option>
                      <option value="INSTITUTE OF ENGINEERING AND RURAL TECHNOLOGY (IERT), ALLAHABAD">INSTITUTE OF ENGINEERING AND RURAL TECHNOLOGY (IERT), ALLAHABAD</option>
                      <option value="INSTITUTE OF ENGINEERING AND TECHNOLOGY (IET), LUCKNOW">INSTITUTE OF ENGINEERING AND TECHNOLOGY (IET), LUCKNOW</option>
                      <option value="INSTITUTE OF TECHNOLOGY AND MANAGEMENT (ITM) GWALIOR">INSTITUTE OF TECHNOLOGY AND MANAGEMENT (ITM) GWALIOR</option>
                      <option value="INSTITUTE OF TECHNOLOGY, GURU GHASIDAS UNIVERSITY (ITGGU), BILASPUR">INSTITUTE OF TECHNOLOGY, GURU GHASIDAS UNIVERSITY (ITGGU), BILASPUR</option>
                      <option value="INTEGRAL UNIVERSITY, LUCKNOW">INTEGRAL UNIVERSITY, LUCKNOW</option>
                      <option value="INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY (IIIT), BHUBANESWAR">INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY (IIIT), BHUBANESWAR</option>
                      <option value="INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY (IIIT), HYDERABAD">INTERNATIONAL INSTITUTE OF INFORMATION TECHNOLOGY (IIIT), HYDERABAD</option>
                      <option value="INTERNATIONAL SCHOOL OF MANAGEMENT, PATNA">INTERNATIONAL SCHOOL OF MANAGEMENT, PATNA</option>
                      <option value="INVERTIS UNIVERSITY, BAREILLY">INVERTIS UNIVERSITY, BAREILLY</option>
                      <option value="J B INSTITUTE OF ENGINEERING AND TECHNOLOGY, HYDERABAD">J B INSTITUTE OF ENGINEERING AND TECHNOLOGY, HYDERABAD</option>
                      <option value="JADAVPUR UNIVERSITY, KOLKATA">JADAVPUR UNIVERSITY, KOLKATA</option>
                      <option value="JAI PRAKASH UNIVERSITY (JP), CHAPRA">JAI PRAKASH UNIVERSITY (JP), CHAPRA</option>
                      <option value="JAIN UNIVERSITY, BANGALORE">JAIN UNIVERSITY, BANGALORE</option>
                      <option value="JAIPUR ENGINEERING COLLEGE AND RESEARCH AND CENTRE (JECRC)">JAIPUR ENGINEERING COLLEGE AND RESEARCH AND CENTRE (JECRC)</option>
                      <option value="JAIPUR INSTITUTE OF TECHOLOGY">JAIPUR INSTITUTE OF TECHOLOGY</option>
                      <option value="JALPAIGURI GOVERNMENT ENGINEERING COLLEGE">JALPAIGURI GOVERNMENT ENGINEERING COLLEGE</option>
                      <option value="JAMIA MILLIA ISLAMIA, NEW DELHI">JAMIA MILLIA ISLAMIA, NEW DELHI</option>
                      <option value="JAWAHARLAL COLLEGE OF ENGINEERING AND TECHNOLOGY, OTTAPALAM">JAWAHARLAL COLLEGE OF ENGINEERING AND TECHNOLOGY, OTTAPALAM</option>
                      <option value="JAWAHARLAL NEHRU ENGINEERING COLLEGE (JNEC), AURANGABAD">JAWAHARLAL NEHRU ENGINEERING COLLEGE (JNEC), AURANGABAD</option>
                      <option value="JAYPEE INSTITUTE OF INFORMATION TECHNOLOGY (JIIT), NOIDA">JAYPEE INSTITUTE OF INFORMATION TECHNOLOGY (JIIT), NOIDA</option>
                      <option value="JAYPEE UNIVERSITY, ANOOPSHAHR">JAYPEE UNIVERSITY, ANOOPSHAHR</option>
                      <option value="JEPPIAAR ENGINEERING COLLEGE, CHENNAI">JEPPIAAR ENGINEERING COLLEGE, CHENNAI</option>
                      <option value="JETKING ALLAHABAD LEARNING CENTER">JETKING ALLAHABAD LEARNING CENTER</option>
                      <option value="JIWAJI UNIVERSITY, GWALIOR">JIWAJI UNIVERSITY, GWALIOR</option>
                      <option value="JK INSTITUTE OF APPLIED PHYSICS AND TECHNOLOGY, ALLAHABAD">JK INSTITUTE OF APPLIED PHYSICS AND TECHNOLOGY, ALLAHABAD</option>
                      <option value="JK LAKSHMIPAT UNIVERSITY, JAIPUR">JK LAKSHMIPAT UNIVERSITY, JAIPUR</option>
                      <option value="JODHPUR INSTITUTE OF ENGINEERING AND TECHNOLOGY (JIET)">JODHPUR INSTITUTE OF ENGINEERING AND TECHNOLOGY (JIET)</option>
                      <option value="JODHPUR INSTITUTE OF ENGINEERING AND TECHNOLOGY">JODHPUR INSTITUTE OF ENGINEERING AND TECHNOLOGY</option>
                      <option value="JP INSTITUTE OF ENGINEERING AND TECHNOLOGY, MEERUT">JP INSTITUTE OF ENGINEERING AND TECHNOLOGY, MEERUT</option>
                      <option value="JS UNIVERSITY, SHIKOHABAD">JS UNIVERSITY, SHIKOHABAD</option>
                      <option value="JSPM'S RAJARSHI SHAHU COLLEGE OF ENGINEERING, PUNE">JSPM'S RAJARSHI SHAHU COLLEGE OF ENGINEERING, PUNE</option>
                      <option value="JSS ACADEMY OF TECHNICAL EDUCATION, BANGALORE">JSS ACADEMY OF TECHNICAL EDUCATION, BANGALORE</option>
                      <option value="JSS ACADEMY OF TECHNICAL EDUCATION, NOIDA">JSS ACADEMY OF TECHNICAL EDUCATION, NOIDA</option>
                      <option value="JWALA DEVI SARASWATI VIDYA MANDIR, ALLAHABAD">JWALA DEVI SARASWATI VIDYA MANDIR, ALLAHABAD</option>
                      <option value="K K WAGH INSTITUTE OF ENGINEERING EDUCATION AND RESEARCH, NASHIK">K K WAGH INSTITUTE OF ENGINEERING EDUCATION AND RESEARCH, NASHIK</option>
                      <option value="K L POLYTECHNIC, ROORKEE">K L POLYTECHNIC, ROORKEE</option>
                      <option value="K.J. SOMAIYA INSTITUTE OF ENGINEERING AND INFORMATION TECHNOLOGY, SION">K.J. SOMAIYA INSTITUTE OF ENGINEERING AND INFORMATION TECHNOLOGY, SION</option>
                      <option value="KAKATIYA INSTITUTE OF TECHNOLOGY AND SCIENCE, WARANGAL">KAKATIYA INSTITUTE OF TECHNOLOGY AND SCIENCE, WARANGAL</option>
                      <option value="KALI CHARAN NIGAM INSTITUTE OF TECHNOLOGY, BANDA">KALI CHARAN NIGAM INSTITUTE OF TECHNOLOGY, BANDA</option>
                      <option value="KALINDI COLLEGE, DELHI">KALINDI COLLEGE, DELHI</option>
                      <option value="KALINGA INSTITUTE OF INDUSTRIAL TECHNOLOGY UNIVERSITY (KIIT)">KALINGA INSTITUTE OF INDUSTRIAL TECHNOLOGY UNIVERSITY (KIIT)</option>
                      <option value="KALINGA INSTITUTE OF INDUSTRIAL TECHNOLOGY, BHUBANESWAR">KALINGA INSTITUTE OF INDUSTRIAL TECHNOLOGY, BHUBANESWAR</option>
                      <option value="KALYANI GOVERNMENT ENGINEERING COLLEGE">KALYANI GOVERNMENT ENGINEERING COLLEGE</option>
                      <option value="KAMARAJ COLLEGE OF ENGINEERING AND TECHNOLOGY, VIRUDHUNAGAR">KAMARAJ COLLEGE OF ENGINEERING AND TECHNOLOGY, VIRUDHUNAGAR</option>
                      <option value="KAMLA NEHRU INSTITUTE OF TECHNOLOGY, SULTANPUR">KAMLA NEHRU INSTITUTE OF TECHNOLOGY, SULTANPUR</option>
                      <option value="KANPUR INSTITUTE OF TECHNOLOGY, KANPUR">KANPUR INSTITUTE OF TECHNOLOGY, KANPUR</option>
                      <option value="KASHI INSTITUTE OF TECHNOLOGY, VARANASI">KASHI INSTITUTE OF TECHNOLOGY, VARANASI</option>
                      <option value="KCMT COLLEGE BAREILLY">KCMT COLLEGE BAREILLY</option>
                      <option value="KESHAV MEMORIAL INSTITUTE OF TECHNOLOGY, HYDERABAD">KESHAV MEMORIAL INSTITUTE OF TECHNOLOGY, HYDERABAD</option>
                      <option value="KIET GROUP OF INSTITUTIONS, GHAZIABAD">KIET GROUP OF INSTITUTIONS, GHAZIABAD</option>
                      <option value="KLE S.NIJALINGAPPA COLLEGE , BANGALORE">KLE S.NIJALINGAPPA COLLEGE , BANGALORE</option>
                      <option value="KNOWLEDGE INSTITUTE OF TECHNOLOGY, SALEM">KNOWLEDGE INSTITUTE OF TECHNOLOGY, SALEM</option>
                      <option value="KONGU ENGINEERING COLLEGE, ERODE">KONGU ENGINEERING COLLEGE, ERODE</option>
                      <option value="KOTA ENGINEERING COLLEGE">KOTA ENGINEERING COLLEGE</option>
                      <option value="KRISHNA INSTITUTE OF ENGINEERING AND TECHNOLOGY, GHAZIABAD">KRISHNA INSTITUTE OF ENGINEERING AND TECHNOLOGY, GHAZIABAD</option>
                      <option value="KULBHUSHAN COLLEGE, AURANGABAD">KULBHUSHAN COLLEGE, AURANGABAD</option>
                      <option value="KUMARAGURU COLLEGE OF TECHNOLOGY, COIMBATORE">KUMARAGURU COLLEGE OF TECHNOLOGY, COIMBATORE</option>
                      <option value="LAKSHMI NARAIN COLLEGE OF TECHNOLOGY (LNCT), BHOPAL">LAKSHMI NARAIN COLLEGE OF TECHNOLOGY (LNCT), BHOPAL</option>
                      <option value="LALIT NARAYAN COLLEGE OF BUSINESS MANAGEMENT, MUZAFFARPUR">LALIT NARAYAN COLLEGE OF BUSINESS MANAGEMENT, MUZAFFARPUR</option>
                      <option value="LDC INSTITUTE OF TECHNICAL STUDIES, ALLAHABAD">LDC INSTITUTE OF TECHNICAL STUDIES, ALLAHABAD</option>
                      <option value="LINGAYA'S UNIVERSITY, FARIDABAD">LINGAYA'S UNIVERSITY, FARIDABAD</option>
                      <option value="LOGMIEER, NASHIK">LOGMIEER, NASHIK</option>
                      <option value="LOK NAYAK JAI PRAKASH INSTITUTE OF TECHNOLOGY CHHAPRA (SARAN)">LOK NAYAK JAI PRAKASH INSTITUTE OF TECHNOLOGY CHHAPRA (SARAN)</option>
                      <option value="LORDS INSTITUTE OF ENGINEERING AND TECHNOLOGY, HYDERABAD">LORDS INSTITUTE OF ENGINEERING AND TECHNOLOGY, HYDERABAD</option>
                      <option value="LNMIIT, JAIPUR">LNMIIT, JAIPUR</option>
                      <option value="LOVELY PROFESSIONAL UNIVERSITY, JALANDHAR">LOVELY PROFESSIONAL UNIVERSITY, JALANDHAR</option>
                      <option value="LUCKNOW INSTITUTE OF TECHNOLOGY">LUCKNOW INSTITUTE OF TECHNOLOGY</option>
                      <option value="LUCKNOW UNIVERSITY">LUCKNOW UNIVERSITY</option>
                      <option value="M S RAMAIAH INSTITUTE OF TECHNOLOGY, BANGALORE">M S RAMAIAH INSTITUTE OF TECHNOLOGY, BANGALORE</option>
                      <option value="M.KUMARASAMY COLLEGE OF ENGINEERING, KARUR">M.KUMARASAMY COLLEGE OF ENGINEERING, KARUR</option>
                      <option value="MADAN MOHAN MALAVIYA UNIVERSITY OF TECHNOLOGY, GORAKHPUR">MADAN MOHAN MALAVIYA UNIVERSITY OF TECHNOLOGY, GORAKHPUR</option>
                      <option value="MADAN MOHAN MALVIYA UNIVERSITY OF TECHNOLOGY (MMMUT), GORAKHPUR">MADAN MOHAN MALVIYA UNIVERSITY OF TECHNOLOGY (MMMUT), GORAKHPUR</option>
                      <option value="MADANAPALEE INSTITUE OF TECHNOLOGY AND SCIENCE">MADANAPALEE INSTITUE OF TECHNOLOGY AND SCIENCE</option>
                      <option value="MADAV INSTITUTE, GWALIOR">MADAV INSTITUTE, GWALIOR</option>
                      <option value="MADHAV INSTITUTE OF TECHNOLOGY AND SCIENCE (MITS), GWALIOR">MADHAV INSTITUTE OF TECHNOLOGY AND SCIENCE (MITS), GWALIOR</option>
                      <option value="MADRAS INSTITUTE OF TECHNOLOGY, CHENNAI">MADRAS INSTITUTE OF TECHNOLOGY, CHENNAI</option>
                      <option value="MAHAKAL INSTITUTE OF TECHNOLOGY, UJJAIN">MAHAKAL INSTITUTE OF TECHNOLOGY, UJJAIN</option>
                      <option value="MAHAMAYA COLLEGE OF AGRICULTURAL ENGINEERING AND TECHNOLOGY">MAHAMAYA COLLEGE OF AGRICULTURAL ENGINEERING AND TECHNOLOGY</option>
                      <option value="MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY, NEW DELHI">MAHARAJA AGRASEN INSTITUTE OF TECHNOLOGY, NEW DELHI</option>
                      <option value="MAHARAJA VIJAYARAM GAJAPATHIRAJ COLLEGE OF ENGINEERING, VIZIANAGARAM">MAHARAJA VIJAYARAM GAJAPATHIRAJ COLLEGE OF ENGINEERING, VIZIANAGARAM</option>
                      <option value="MAHARANA PRATAP ENGINEERING COLLEGE, KANPUR">MAHARANA PRATAP ENGINEERING COLLEGE, KANPUR</option>
                      <option value="MAHARASHTRA INSTITUTE OF TECHNOLOGY, PUNE">MAHARASHTRA INSTITUTE OF TECHNOLOGY, PUNE</option>
                      <option value="MAHARISHI MARKANDESHWAR ENGINEERING COLLEGE MULLANA, AMBALA">MAHARISHI MARKANDESHWAR ENGINEERING COLLEGE MULLANA, AMBALA</option>
                      <option value="MAHARISHI MARKANDESHWAR UNIVERSITY, AMBALA">MAHARISHI MARKANDESHWAR UNIVERSITY, AMBALA</option>
                      <option value="MAHATMA GANDHI KASHI VIDHYAPEETH (MGKVP), VARANASI">MAHATMA GANDHI KASHI VIDHYAPEETH (MGKVP), VARANASI</option>
                      <option value="MAHATMA JYOTIBA PHULE ROHILKHAND UNIVERSITY (MJPRU), BAREILLY">MAHATMA JYOTIBA PHULE ROHILKHAND UNIVERSITY (MJPRU), BAREILLY</option>
                      <option value="MAHENDRA ENGINEERING COLLEGE, MALLASAMUDRAM">MAHENDRA ENGINEERING COLLEGE, MALLASAMUDRAM</option>
                      <option value="MAHENDRA INSTITUTE OF TECHNOLOGY, MALLASAMUDRAM">MAHENDRA INSTITUTE OF TECHNOLOGY, MALLASAMUDRAM</option>
                      <option value="MAHILA MAHAVIDYALAYA (MMV)(BHU), VARANASI">MAHILA MAHAVIDYALAYA (MMV)(BHU), VARANASI</option>
                      <option value="MAHINDRA ECOLE CENTRALE, HYDERABAD">MAHINDRA ECOLE CENTRALE, HYDERABAD</option>
                      <option value="MATA SUNDARI COLLEGE FOR WOMEN, DELHI">MATA SUNDARI COLLEGE FOR WOMEN, DELHI</option>
                      <option value="MALAVIYA NATIONAL INSTITUTE OF TECHNOLOGY (MNIT), JAIPUR">MALAVIYA NATIONAL INSTITUTE OF TECHNOLOGY (MNIT), JAIPUR</option>
                      <option value="MALIBA PHARMACY COLLEGE, SURAT">MALIBA PHARMACY COLLEGE, SURAT</option>
                      <option value="MALLA REDDY COLLEGE OF ENGINEERING AND TECHNOLOGY (MRCET), HYDERABAD">MALLA REDDY COLLEGE OF ENGINEERING AND TECHNOLOGY (MRCET), HYDERABAD</option>
                      <option value="MANAV RACHNA COLLEGE OF ENGINEERING, FARIDABAD">MANAV RACHNA COLLEGE OF ENGINEERING, FARIDABAD</option>
                      <option value="MANDSAUR INSTITUTE OF TECHNOLOGY">MANDSAUR INSTITUTE OF TECHNOLOGY</option>
                      <option value="MANIKYA LAL VERMA TEXTILE AND ENGINEERING COLLEGE, BHILWARA">MANIKYA LAL VERMA TEXTILE AND ENGINEERING COLLEGE, BHILWARA</option>
                      <option value="MANIPAL INSTITUTE OF TECHNOLOGY (MIT), MANIPAL">MANIPAL INSTITUTE OF TECHNOLOGY (MIT), MANIPAL</option>
                      <option value="MANIPAL UNIVERSITY, JAIPUR">MANIPAL UNIVERSITY, JAIPUR</option>
                      <option value="MARINE ENGINEERING AND RESEARCH INSTITUTE, MUMBAI">MARINE ENGINEERING AND RESEARCH INSTITUTE, MUMBAI</option>
                      <option value="MAULANA AZAD NATIONAL INSTITUTE OF TECHNOLOGY (MANIT), BHOPAL">MAULANA AZAD NATIONAL INSTITUTE OF TECHNOLOGY (MANIT), BHOPAL</option>
                      <option value="MAULANA MUKHTAR AHMAD NADVI TECHNICAL CAMPUS, NASHIK">MAULANA MUKHTAR AHMAD NADVI TECHNICAL CAMPUS, NASHIK</option>
                      <option value="MAYA ACADEMY OF ADVANCED CINEMATICS, KANPUR">MAYA ACADEMY OF ADVANCED CINEMATICS, KANPUR</option>
                      <option value="MBICEM GGSIPU , DELHI">MBICEM GGSIPU , DELHI</option>
                      <option value="MBM ENGINEERING COLLEGE, RATANADA, JODHPUR">MBM ENGINEERING COLLEGE, RATANADA, JODHPUR</option>
                      <option value="MCKV INSTITUTE OF ENGINEERING, HOWRAH">MCKV INSTITUTE OF ENGINEERING, HOWRAH</option>
                      <option value="MEDICAPS UNIVERSITY, INDORE">MEDICAPS UNIVERSITY, INDORE</option>
                      <option value="MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE, CHENNAI">MEENAKSHI SUNDARARAJAN ENGINEERING COLLEGE, CHENNAI</option>
                      <option value="MEERUT INSTITUTE OF ENGINEERING AND TECHNOLOGY">MEERUT INSTITUTE OF ENGINEERING AND TECHNOLOGY</option>
                      <option value="MEGHNAD SAHA INSTITUTE OF TECHNOLOGY (MSIT) , KOLKATA">MEGHNAD SAHA INSTITUTE OF TECHNOLOGY (MSIT) , KOLKATA</option>
                      <option value="METHODIST COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD">METHODIST COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD</option>
                      <option value="MICROTEK INSTITUTE OF TECHNOLOGY, VARANASI">MICROTEK INSTITUTE OF TECHNOLOGY, VARANASI</option>
                      <option value="MIDNAPORE COLLEGE (AUTONOMOUS)">MIDNAPORE COLLEGE (AUTONOMOUS)</option>
                      <option value="MIT ACADEMY OF ENGINEERING, PUNE">MIT ACADEMY OF ENGINEERING, PUNE</option>
                      <option value="MIT MORADABAD">MIT MORADABAD</option>
                      <option value="MM COLLEGE OF PHARMACY, AMBALA">MM COLLEGE OF PHARMACY, AMBALA</option>
                      <option value="MMTD COLLEGE BALLIA">MMTD COLLEGE BALLIA</option>
                      <option value="MNM JAIN ENGINEERING COLLEGE, CHENNAI">MNM JAIN ENGINEERING COLLEGE, CHENNAI</option>
                      <option value="MNNIT ALLAHABAD">MNNIT ALLAHABAD</option>
                      <option value="MORADABAD INSTITUTE OF TECHNOLOGY (MIT) , MORADABAD">MORADABAD INSTITUTE OF TECHNOLOGY (MIT) , MORADABAD</option>
                      <option value="MUKESH PATEL SCHOOL OF TECHNOLOGY MANAGEMENT AND ENGINEERING (MPSTME), MUMBAI">MUKESH PATEL SCHOOL OF TECHNOLOGY MANAGEMENT AND ENGINEERING (MPSTME), MUMBAI</option>
                      <option value="MVJ COLLEGE OF ENGINEERING (MVJCE) , BANGALORE">MVJ COLLEGE OF ENGINEERING (MVJCE) , BANGALORE</option>
                      <option value="MVN UNIVERSITY, PALWAL">MVN UNIVERSITY, PALWAL</option>
                      <option value="NALANDA COLLEGE BIHARSHARIF">NALANDA COLLEGE BIHARSHARIF</option>
                      <option value="NARULA INSTITUTE OF TECHNOLOGY, KOLKATA">NARULA INSTITUTE OF TECHNOLOGY, KOLKATA</option>
                      <option value="NATIONAL INSTITUTE OF FASHION TECHNOLOGY (NIFT), MUMBAI">NATIONAL INSTITUTE OF FASHION TECHNOLOGY (NIFT), MUMBAI</option>
                      <option value="NATIONAL INSTITUTE OF FASHION TECHNOLOGY, BHUBANESWAR">NATIONAL INSTITUTE OF FASHION TECHNOLOGY, BHUBANESWAR</option>
                      <option value="NATIONAL INSTITUTE OF FOUNDRY AND FORGE TECHNOLOGY, RANCHI">NATIONAL INSTITUTE OF FOUNDRY AND FORGE TECHNOLOGY, RANCHI</option>
                      <option value="NATIONAL INSTITUTE OF SCIENCE AND TECHNOLOGY, BERHAMPUR">NATIONAL INSTITUTE OF SCIENCE AND TECHNOLOGY, BERHAMPUR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT) , DELHI">NATIONAL INSTITUTE OF TECHNOLOGY (NIT) , DELHI</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), AGARTALA">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), AGARTALA</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), DURGAPUR">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), DURGAPUR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), CALICUT">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), CALICUT</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), GOA">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), GOA</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), HAMIRPUR">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), HAMIRPUR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), JAMSHEDPUR">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), JAMSHEDPUR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), KURUKSHETRA">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), KURUKSHETRA</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), MEGHALAYA">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), MEGHALAYA</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), MANIPUR">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), MANIPUR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), MIZORAM">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), MIZORAM</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), NAGALAND">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), NAGALAND</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), PATNA">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), PATNA</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), PUDUCHERRY">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), PUDUCHERRY</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), RAIPUR">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), RAIPUR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), ROURKELA">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), ROURKELA</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SILCHAR">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SILCHAR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SRINAGAR">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SRINAGAR</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SIKKIM">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SIKKIM</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SURATHKAL">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), SURATHKAL</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), TIRUCHIRAPPALLI">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), TIRUCHIRAPPALLI</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), TADEPALLIGUDAM">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), TADEPALLIGUDAM</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), UTTARAKHAND">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), UTTARAKHAND</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), WARANGAL">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), WARANGAL</option>
                      <option value="NATIONAL INSTITUTE OF TECHNOLOGY (NIT), YUPIA, ARUNACHAL PRADESH">NATIONAL INSTITUTE OF TECHNOLOGY (NIT), YUPIA, ARUNACHAL PRADESH</option>
                      <option value="NATIONAL POST GRADUATION COLLEGE, LUCKNOW">NATIONAL POST GRADUATION COLLEGE, LUCKNOW</option>
                      <option value="NATIONAL POWER TRAINING INSTITUTE (NPTI), DURGAPUR">NATIONAL POWER TRAINING INSTITUTE (NPTI), DURGAPUR</option>
                      <option value="NATIONAL POWER TRAINING INSTITUTE (NPTI), NEW DELHI">NATIONAL POWER TRAINING INSTITUTE (NPTI), NEW DELHI</option>
                      <option value="NBN SINHGAD COLLEGE OF ENGINEERING, SOLAPUR">NBN SINHGAD COLLEGE OF ENGINEERING, SOLAPUR</option>
                      <option value="NETAJI SUBHASH ENGINEERING COLLEGE, KOLKATA">NETAJI SUBHASH ENGINEERING COLLEGE, KOLKATA</option>
                      <option value="NETAJI SUBHASH INSTITUTE OF TECHNOLGY (NSIT) , DELHI">NETAJI SUBHASH INSTITUTE OF TECHNOLGY (NSIT) , DELHI</option>
                      <option value="NEW GOVERNMENT ENGINEERING COLLEGE, RAIPUR">NEW GOVERNMENT ENGINEERING COLLEGE, RAIPUR</option>
                      <option value="NEW HORIZON COLLEGE OF ENGINERING, BANGALORE">NEW HORIZON COLLEGE OF ENGINERING, BANGALORE</option>
                      <option value="NIFFT RANCHI">NIFFT RANCHI</option>
                      <option value="NIIT UNIVERSITY, NEEMRANA">NIIT UNIVERSITY, NEEMRANA</option>
                      <option value="NOIDA INSTITUTE OF ENGINEERING AND TECHNOLOGY (NIET)">NOIDA INSTITUTE OF ENGINEERING AND TECHNOLOGY (NIET)</option>
                      <option value="NORTH MALABAR INSTITUTE OF TECHNOLOGY KASARGOD">NORTH MALABAR INSTITUTE OF TECHNOLOGY KASARGOD</option>
                      <option value="NORTHERN INDIA ENGINEERING COLLEGE, DELHI">NORTHERN INDIA ENGINEERING COLLEGE, DELHI</option>
                      <option value="NSHM COLLEGE OF MANAGEMENT AND TECHNOLOGY, KOLKATA">NSHM COLLEGE OF MANAGEMENT AND TECHNOLOGY, KOLKATA</option>
                      <option value="NSIT PATNA">NSIT PATNA</option>
                      <option value="O P JINDAL INSTITUTE OF TECHNOLOGY RAIGARH">O P JINDAL INSTITUTE OF TECHNOLOGY RAIGARH</option>
                      <option value="OM KOTHARI INSTITUTE OF MANAGEMENT AND RESEARCH, KOTA">OM KOTHARI INSTITUTE OF MANAGEMENT AND RESEARCH, KOTA</option>
                      <option value="ORIENTAL INSTITUTE OF SCIENCE AND TECHNOLOGY, BHOPAL">ORIENTAL INSTITUTE OF SCIENCE AND TECHNOLOGY, BHOPAL</option>
                      <option value="OXFORD COLLEGE OF ENGINEERING AND MANAGEMENT, ROURKELA">OXFORD COLLEGE OF ENGINEERING AND MANAGEMENT, ROURKELA</option>
                      <option value="P E S COLLEGE OF ENGINEERING, AURANGABAD">P E S COLLEGE OF ENGINEERING, AURANGABAD</option>
                      <option value="P S N A COLLEGE OF ENGINEERING AND TECHNOLOGY, MANNARGUDI">P S N A COLLEGE OF ENGINEERING AND TECHNOLOGY, MANNARGUDI</option>
                      <option value="PANDIT DEENDAYAL PETROLEUM UNIVERSITY, GANDHINAGAR">PANDIT DEENDAYAL PETROLEUM UNIVERSITY, GANDHINAGAR</option>
                      <option value="PANIMALAR ENGINEERING COLLEGE, CHENNAI">PANIMALAR ENGINEERING COLLEGE, CHENNAI</option>
                      <option value="PANIPAT INSTITUTE OF ENGINEERING AND TECHNOLOGY (PIET)">PANIPAT INSTITUTE OF ENGINEERING AND TECHNOLOGY (PIET)</option>
                      <option value="PANNALAL GIRDHARLAL DAYANAND ANGLO VEDIC COLLEGE (PG DAV), NEW DELHI">PANNALAL GIRDHARLAL DAYANAND ANGLO VEDIC COLLEGE (PG DAV), NEW DELHI</option>
                      <option value="PARALA MAHARAJA GOVT. ENGG COLLEGE, BERHAMPUR">PARALA MAHARAJA GOVT. ENGG COLLEGE, BERHAMPUR</option>
                      <option value="PATEL COLLEGE OF SCIENCE AND TECHNOLOGY (PCST), BHOPAL">PATEL COLLEGE OF SCIENCE AND TECHNOLOGY (PCST), BHOPAL</option>
                      <option value="PATNA COLLEGE, PATNA">PATNA COLLEGE, PATNA</option>
                      <option value="PATNA LAW COLLEGE">PATNA LAW COLLEGE</option>
                      <option value="PATNA UNIVERSITY">PATNA UNIVERSITY</option>
                      <option value="PDM COLLEGE OF ENGINEERING (PDMCE) , BAHADURGARH">PDM COLLEGE OF ENGINEERING (PDMCE) , BAHADURGARH</option>
                      <option value="PEC UNIVERSITY OF TECHNOLOGY, CHANDIGARH">PEC UNIVERSITY OF TECHNOLOGY, CHANDIGARH</option>
                      <option value="PERIYAR MANIAMMAI UNIVERSITY, THANJAVUR">PERIYAR MANIAMMAI UNIVERSITY, THANJAVUR</option>
                      <option value="PONDICHERRY ENGINEERING COLLEGE">PONDICHERRY ENGINEERING COLLEGE</option>
                      <option value="POORNIMA COLLEGE OF ENGINEERING, JAIPUR">POORNIMA COLLEGE OF ENGINEERING, JAIPUR</option>
                      <option value="POST GRADUATE COLLEGE, GHAZIPUR">POST GRADUATE COLLEGE, GHAZIPUR</option>
                      <option value="PRANVEER SINGH INSTITUTE OF TECHNOLOGY (PSIT), KANPUR">PRANVEER SINGH INSTITUTE OF TECHNOLOGY (PSIT), KANPUR</option>
                      <option value="PRESTIGE INSTITUTE OF MANAGEMENT, GWALIOR">PRESTIGE INSTITUTE OF MANAGEMENT, GWALIOR</option>
                      <option value="PROF RAM MEGHE INSTITUTE OF TECHNOLOGY AND RESEARCH (PRMITR), AMRAVATI">PROF RAM MEGHE INSTITUTE OF TECHNOLOGY AND RESEARCH (PRMITR), AMRAVATI</option>
                      <option value="PRRM ENGINEERING COLLEGE, SHAHABAD">PRRM ENGINEERING COLLEGE, SHAHABAD</option>
                      <option value="PSNA COLLEGE OF ENGINEERING AND TECHNOLOGY (PSNACET), DINDIGUL">PSNA COLLEGE OF ENGINEERING AND TECHNOLOGY (PSNACET), DINDIGUL</option>
                      <option value="PUNE INSTITUTE OF COMPUTER TECHNOLOGY (PICT)">PUNE INSTITUTE OF COMPUTER TECHNOLOGY (PICT)</option>
                      <option value="PUNJABI UNIVERSITY, PATIALA">PUNJABI UNIVERSITY, PATIALA</option>
                      <option value="PVG'S COET, PUNE">PVG'S COET, PUNE</option>
                      <option value="QUANTUM GLOBAL CAMPUS, ROORKEE">QUANTUM GLOBAL CAMPUS, ROORKEE</option>
                      <option value="QUANTUM SCHOOL OF TECHNOLOGY, ROORKEE">QUANTUM SCHOOL OF TECHNOLOGY, ROORKEE</option>
                      <option value="R V R AND J C COLLEGE OF ENGINEERING, GUNTUR">R V R AND J C COLLEGE OF ENGINEERING, GUNTUR</option>
                      <option value="R.K.D.F IST , BHOPAL">R.K.D.F IST , BHOPAL</option>
                      <option value="R.M.K COLLEGE OF ENGINEERING AND TECHNOLOGY, CHENNAI">R.M.K COLLEGE OF ENGINEERING AND TECHNOLOGY, CHENNAI</option>
                      <option value="RADHARAMAN COLLEGE OF ENGINEERING, ELURU">RADHARAMAN COLLEGE OF ENGINEERING, ELURU</option>
                      <option value="RADHARAMAN INSTITUTE OF TECHNOLOGY AND SCIENCE, BHOPAL">RADHARAMAN INSTITUTE OF TECHNOLOGY AND SCIENCE, BHOPAL</option>
                      <option value="RAGHU ENGINEERING COLLEGE, VISHAKAPATNAM">RAGHU ENGINEERING COLLEGE, VISHAKAPATNAM</option>
                      <option value="RAGHU INSTITUTE OF TECHNOLOGY, VARANASI">RAGHU INSTITUTE OF TECHNOLOGY, VARANASI</option>
                      <option value="RAIPUR INSTITUTE OF TECHNOLOGY (RITEE CG), RAIPUR">RAIPUR INSTITUTE OF TECHNOLOGY (RITEE CG), RAIPUR</option>
                      <option value="RAIPUR INSTITUTE OF TECHNOLOGY, RAIPUR">RAIPUR INSTITUTE OF TECHNOLOGY, RAIPUR</option>
                      <option value="RAJ KUMAR GOEL INSTITUTE OF TECHNOLOGY (RKGIT), GHAZIABAD.">RAJ KUMAR GOEL INSTITUTE OF TECHNOLOGY (RKGIT), GHAZIABAD.</option>
                      <option value="RAJALAKSHMI ENGINEERING COLLEGE, CHENNAI">RAJALAKSHMI ENGINEERING COLLEGE, CHENNAI</option>
                      <option value="RAJARSHI SCHOOL OF MANAGEMENT AND TECHNOLOGY, VARANASI">RAJARSHI SCHOOL OF MANAGEMENT AND TECHNOLOGY, VARANASI</option>
                      <option value="RAJARSHI SHAHU COLLEGE OF ENGINEERING, PUNE">RAJARSHI SHAHU COLLEGE OF ENGINEERING, PUNE</option>
                      <option value="RAJASTHAN COLLEGE OF ENGINEERING FOR WOMEN (RCEW) , JAIPUR">RAJASTHAN COLLEGE OF ENGINEERING FOR WOMEN (RCEW) , JAIPUR</option>
                      <option value="RAJASTHAN TECHNICAL UNIVERSITY (RTU), KOTA">RAJASTHAN TECHNICAL UNIVERSITY (RTU), KOTA</option>
                      <option value="RAJDHANI COLLEGE, DELHI UNIVERSITY (DU), DELHI">RAJDHANI COLLEGE, DELHI UNIVERSITY (DU), DELHI</option>
                      <option value="RAJIKIYA ENGINEERING COLLEGE, BANDA">RAJIKIYA ENGINEERING COLLEGE, BANDA</option>
                      <option value="RAJIV GANDHI INSTITUTE OF PETROLEUM TECHNOLOGY, RAE BARELI">RAJIV GANDHI INSTITUTE OF PETROLEUM TECHNOLOGY, RAE BARELI</option>
                      <option value="RAJKIYA ENGINEERING COLLEGE, AZAMGARH">RAJKIYA ENGINEERING COLLEGE, AZAMGARH</option>
                      <option value="RAJKIYA ENGINEERING COLLEGE, SONEBHADRA">RAJKIYA ENGINEERING COLLEGE, SONEBHADRA</option>
                      <option value="RAMAMANOHAR LOHIA COLLEGE OF LAW (RMLCL) , BANGALORE">RAMAMANOHAR LOHIA COLLEGE OF LAW (RMLCL) , BANGALORE</option>
                      <option value="RAVENSHAW JUNIOR COLLEGE, CUTTACK">RAVENSHAW JUNIOR COLLEGE, CUTTACK</option>
                      <option value="RAYAT BAHRA INSTITUTE OF ENGINEERING AND NANOTECHNOLOGY, HOSHIARPUR">RAYAT BAHRA INSTITUTE OF ENGINEERING AND NANOTECHNOLOGY, HOSHIARPUR</option>
                      <option value="RIMT MAHARAJA AGARASEN ENGINEERING COLLEGE(RIMT MAEC), MANDI">RIMT MAHARAJA AGARASEN ENGINEERING COLLEGE(RIMT MAEC), MANDI</option>
                      <option value="RMK COLLEGE OF ENGINEERING AND TECHNOLOGY, PUDUVOYAL">RMK COLLEGE OF ENGINEERING AND TECHNOLOGY, PUDUVOYAL</option>
                      <option value="ROORKEE ENGINEERING AND MANAGEMENT TECHNOLOGY INSTITUTE , ROORKEE">ROORKEE ENGINEERING AND MANAGEMENT TECHNOLOGY INSTITUTE , ROORKEE</option>
                      <option value="RSR RUNGTA COLLEGE OF ENGINEERING AND TECHNOLOGY, RAIPUR">RSR RUNGTA COLLEGE OF ENGINEERING AND TECHNOLOGY, RAIPUR</option>
                      <option value="RUNGTA COLLEGE OF ENGINEERING AND TECHNOLOGY(RCET), BHILAI">RUNGTA COLLEGE OF ENGINEERING AND TECHNOLOGY(RCET), BHILAI</option>
                      <option value="S. R. INSTITUTE OF MANAGEMENT AND TECHNOLOGY (SRIMT), LUCKNOW">S. R. INSTITUTE OF MANAGEMENT AND TECHNOLOGY (SRIMT), LUCKNOW</option>
                      <option value="SAGAR INSTITUTE OF RESEARCH TECHNOLOGY (SIRT), BHOPAL">SAGAR INSTITUTE OF RESEARCH TECHNOLOGY (SIRT), BHOPAL</option>
                      <option value="SAGAR INSTITUTE OF SCIENCE TECHNOLOGY AND RESEARCH (SISTEC-R), BHOPAL">SAGAR INSTITUTE OF SCIENCE TECHNOLOGY AND RESEARCH (SISTEC-R), BHOPAL</option>
                      <option value="SAINTGITS COLLEGE OF ENGINEERING, KOTTAYA">SAINTGITS COLLEGE OF ENGINEERING, KOTTAYA</option>
                      <option value="SAM HIGGINBOTTOM UNIVERSITY OF AGRICULTURE, TECHNOLOGY AND SCIENCES (SHUATS)">SAM HIGGINBOTTOM UNIVERSITY OF AGRICULTURE, TECHNOLOGY AND SCIENCES (SHUATS)</option>
                      <option value="SAMRAT ASHOK TECHNOLOGICAL INSTITUTE (SATI), VIDISHA">SAMRAT ASHOK TECHNOLOGICAL INSTITUTE (SATI), VIDISHA</option>
                      <option value="SANATAN DHARM INTER COLLEGE, VARANASI">SANATAN DHARM INTER COLLEGE, VARANASI</option>
                      <option value="SANDIP INSTITUTE OF TECHNOLOGY AND RESEARCH CENTER (SITRC), NASHIK">SANDIP INSTITUTE OF TECHNOLOGY AND RESEARCH CENTER (SITRC), NASHIK</option>
                      <option value="SANGOLA COLLEGE, SANGOLA">SANGOLA COLLEGE, SANGOLA</option>
                      <option value="SANT LONGOWAL INSTITUTE OF ENGINEERING AND TECHNOLOGY (SLIET), LONGOWAL">SANT LONGOWAL INSTITUTE OF ENGINEERING AND TECHNOLOGY (SLIET), LONGOWAL</option>
                      <option value="SARASWATI COLLEGE OF ENGINEERING, NAVI MUMBAI">SARASWATI COLLEGE OF ENGINEERING, NAVI MUMBAI</option>
                      <option value="SARDAR VALLABHBHAI NATIONAL INSTITUTE OF TECHNOLOGY (SVNIT), SURAT">SARDAR VALLABHBHAI NATIONAL INSTITUTE OF TECHNOLOGY (SVNIT), SURAT</option>
                      <option value="SATHYABAMA UNIVERSITY, CHENNAI">SATHYABAMA UNIVERSITY, CHENNAI</option>
                      <option value="SATYASAI ENGINEERING COLLEGE, BALASORE">SATYASAI ENGINEERING COLLEGE, BALASORE</option>
                      <option value="SCHOOL OF ENGINEERING AND TECHNOLOGY, VIKRAM UNIVERSITY, UJJAIN">SCHOOL OF ENGINEERING AND TECHNOLOGY, VIKRAM UNIVERSITY, UJJAIN</option>
                      <option value="SEACOM ENGINEERING COLLEGE, WEST BENGAL">SEACOM ENGINEERING COLLEGE, WEST BENGAL</option>
                      <option value="SCHOOL OF ENGINEERING, CUSAT, KOCHIN">SCHOOL OF ENGINEERING, CUSAT, KOCHIN</option>
                      <option value="SCHOOL OF MANAGEMENT SCIENCES (SMS), VARANASI">SCHOOL OF MANAGEMENT SCIENCES (SMS), VARANASI</option>
                      <option value="SCHOOL OF MANAGEMENT SCIENCES, LUCKNOW">SCHOOL OF MANAGEMENT SCIENCES, LUCKNOW</option>
                      <option value="SCHOOL OF OPEN LEARNING, DU, NEW DELHI">SCHOOL OF OPEN LEARNING, DU, NEW DELHI</option>
                      <option value="SCHOOL OF PLANNING AND ARCHITECTURE, BHOPAL (SPA BHOPAL)">SCHOOL OF PLANNING AND ARCHITECTURE, BHOPAL (SPA BHOPAL)</option>
                      <option value="SETH M. R. JAIPURIA SCHOOL, LUCKNOW">SETH M. R. JAIPURIA SCHOOL, LUCKNOW</option>
                      <option value="SHAHEED RAJGURU COLLEGE OF APPLIED SCIENCES FOR WOMEN, DELHI">SHAHEED RAJGURU COLLEGE OF APPLIED SCIENCES FOR WOMEN, DELHI</option>
                      <option value="SHAMBHUNATH INSTITUTE OF ENGINEERING AND TECHNOLOGY (SIET), ALLAHABAD">SHAMBHUNATH INSTITUTE OF ENGINEERING AND TECHNOLOGY (SIET), ALLAHABAD</option>
                      <option value="SHAMBHUNATH INSTITUTE OF ENGINEERING AND TECHNOLOGY JHALWA, ALLAHABAD">SHAMBHUNATH INSTITUTE OF ENGINEERING AND TECHNOLOGY JHALWA, ALLAHABAD</option>
                      <option value="SHARDA UNIVERSITY, DELHI NCR">SHARDA UNIVERSITY, DELHI NCR</option>
                      <option value="SHEAT COLLEGE OF ENGINEERING AND MANAGEMENT, BABATPUR">SHEAT COLLEGE OF ENGINEERING AND MANAGEMENT, BABATPUR</option>
                      <option value="SHIMON NAWAZ LOAN">SHIMON NAWAZ LOAN</option>
                      <option value="SHIV NADAR UNIVERSITY (SNU), DADRI">SHIV NADAR UNIVERSITY (SNU), DADRI</option>
                      <option value="SHREE BHAWANI NIKETAN INSTITUTE OF TECHNOLOGY AND MANAGEMENT (SBNITM), JAIPUR">SHREE BHAWANI NIKETAN INSTITUTE OF TECHNOLOGY AND MANAGEMENT (SBNITM), JAIPUR</option>
                      <option value="SHRI G.S INSTITUTE OF TECH AND SCIENCE INDORE (SGSITS), INDORE">SHRI G.S INSTITUTE OF TECH AND SCIENCE INDORE (SGSITS), INDORE</option>
                      <option value="SHRI MATA VAISHNO DEVI UNIVERSITY(SMVDU), KATRA, JANDK">SHRI MATA VAISHNO DEVI UNIVERSITY(SMVDU), KATRA, JANDK</option>
                      <option value="SHRI RAM MURTI SMARAK COLLEGE OF ENGINEERING AND TECHNOLOGY, BAREILLY">SHRI RAM MURTI SMARAK COLLEGE OF ENGINEERING AND TECHNOLOGY, BAREILLY</option>
                      <option value="SHRI RAM MURTI SMARAK INSTITUTIONS (SRMS), BAREILLY">SHRI RAM MURTI SMARAK INSTITUTIONS (SRMS), BAREILLY</option>
                      <option value="SHRI RAMSWAROOP MEMORIAL COLLEGE OF ENGINEERING AND MANAGEMENT, LUCKNOW">SHRI RAMSWAROOP MEMORIAL COLLEGE OF ENGINEERING AND MANAGEMENT, LUCKNOW</option>
                      <option value="SHRI RAM INSTITUTE OF TECHNOLOGY, JABALPUR">SHRI RAM INSTITUTE OF TECHNOLOGY, JABALPUR</option>
                      <option value="SHRI RAMSWAROOP MEMORIAL GROUP OF PROFESSIONAL COLLEGES , LUCKNOW">SHRI RAMSWAROOP MEMORIAL GROUP OF PROFESSIONAL COLLEGES , LUCKNOW</option>
                      <option value="SHRI RAMSWAROOP MEMORIAL UNIVERSITY (SRMU), LUCKNOW">SHRI RAMSWAROOP MEMORIAL UNIVERSITY (SRMU), LUCKNOW</option>
                      <option value="SHRI SANT GADGE BABA COLLEGE OF ENGINEERING AND TECHNOLOGY, BHUSAWAL">SHRI SANT GADGE BABA COLLEGE OF ENGINEERING AND TECHNOLOGY, BHUSAWAL</option>
                      <option value="SHRI SHANKARACHARYA COLLEGE OF ENGINEERING AND TECHNOLOGY, BHILAI">SHRI SHANKARACHARYA COLLEGE OF ENGINEERING AND TECHNOLOGY, BHILAI</option>
                      <option value="SHRI SHANKARACHARYA INSTITUTE OF PROFESSIONAL MANAGEMENT AND TECHNOLOGY (SSIPMT), RAIPUR">SHRI SHANKARACHARYA INSTITUTE OF PROFESSIONAL MANAGEMENT AND TECHNOLOGY (SSIPMT), RAIPUR</option>
                      <option value="SHRI SHANKARACHARYA INSTITUTE OF PROFESSIONAL MANAGEMENT AND TECHNOLOGY, RAIPUR">SHRI SHANKARACHARYA INSTITUTE OF PROFESSIONAL MANAGEMENT AND TECHNOLOGY, RAIPUR</option>
                      <option value="SHRI SIDDHI VINAYAK INSTITUTE OF TECHNOLOGY (SSVIT), BAREILLY">SHRI SIDDHI VINAYAK INSTITUTE OF TECHNOLOGY (SSVIT), BAREILLY</option>
                      <option value="SHRI VAISHNAV INSTITUTE OF TECHNOLOGY AND SCIENCE (SVITS), INDORE">SHRI VAISHNAV INSTITUTE OF TECHNOLOGY AND SCIENCE (SVITS), INDORE</option>
                      <option value="SHRI VAISHNAV INSTITUTE OF TECHNOLOGY AND SCIENCE (SVITS), INDORE">SHRI VAISHNAV INSTITUTE OF TECHNOLOGY AND SCIENCE (SVITS), INDORE</option>
                      <option value="SHYAMA PRASAD MUKHERJI COLLEGE (SPM), DELHI UNIVERSITY (DU)">SHYAMA PRASAD MUKHERJI COLLEGE (SPM), DELHI UNIVERSITY (DU)</option>
                      <option value="SIDDAGANGA INSTITUTE OF TECHNOLOGY (SIT) , BANGALORE">SIDDAGANGA INSTITUTE OF TECHNOLOGY (SIT) , BANGALORE</option>
                      <option value="SIDDHARTH INSTITUTE OF ENGINEERING AND TECHNOLOGY, PUTTUR">SIDDHARTH INSTITUTE OF ENGINEERING AND TECHNOLOGY, PUTTUR</option>
                      <option value="SIDDHARTHA INSTITUTE OF TECHNOLOGY AND SCIENCES, NARAPALLY">SIDDHARTHA INSTITUTE OF TECHNOLOGY AND SCIENCES, NARAPALLY</option>
                      <option value="SILIGURI INSTITUTE OF TECHNOLOGY, SILIGURI">SILIGURI INSTITUTE OF TECHNOLOGY, SILIGURI</option>
                      <option value="SINGHANIA UNIVERSITY, BANGALORE">SINGHANIA UNIVERSITY, BANGALORE</option>
                      <option value="SINHGAD COLLEGE OF ENGINEERING, PUNE">SINHGAD COLLEGE OF ENGINEERING, PUNE</option>
                      <option value="SIR C R REDDY COLLEGE OF ENGINEERING, ELURU.">SIR C R REDDY COLLEGE OF ENGINEERING, ELURU.</option>
                      <option value="SITYOG INSTITUTE OF TECHNOLOGY , AURANGABAD">SITYOG INSTITUTE OF TECHNOLOGY , AURANGABAD</option>
                      <option value="SOMERVILLE SCHOOL, NOIDA">SOMERVILLE SCHOOL, NOIDA</option>
                      <option value="SOUTH CITY COLLEGE, KOLKATA">SOUTH CITY COLLEGE, KOLKATA</option>
                      <option value="SREE CHITRA THIRUNAL COLLEGE OF ENGINEERING (SCT), THIRUVANANTHAPURAM">SREE CHITRA THIRUNAL COLLEGE OF ENGINEERING (SCT), THIRUVANANTHAPURAM</option>
                      <option value="SREE DATTHA INSTITUTE OF ENGINEERING AND SCIENCE, HYDERABAD">SREE DATTHA INSTITUTE OF ENGINEERING AND SCIENCE, HYDERABAD</option>
                      <option value="SRI CHANDRASEKARENDRA SARASWATHI VISWA MAHA VIDYALAYA (SCSVMV), KANCHEEPURAM">SRI CHANDRASEKARENDRA SARASWATHI VISWA MAHA VIDYALAYA (SCSVMV), KANCHEEPURAM</option>
                      <option value="SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY, COIMBATORE">SRI KRISHNA COLLEGE OF ENGINEERING AND TECHNOLOGY, COIMBATORE</option>
                      <option value="SRI KRISHNADEVARAYA UNIVERSITY COLLEGE OF ENGINEERING AND TECHNOLOGY, ANANTAPURAMU">SRI KRISHNADEVARAYA UNIVERSITY COLLEGE OF ENGINEERING AND TECHNOLOGY, ANANTAPURAMU</option>
                      <option value="SRI MANAKULA VINAYAGAR ENGINEERING COLLEGE (SMVEC), PUDUCHERRY">SRI MANAKULA VINAYAGAR ENGINEERING COLLEGE (SMVEC), PUDUCHERRY</option>
                      <option value="SRI VENKATESHWARA COLLEGE OF ENGINEERING, CHENNAI">SRI VENKATESHWARA COLLEGE OF ENGINEERING, CHENNAI</option>
                      <option value="SRI VENKATESWARA COLLEGE OF ENGINEERING (SVCE), CHENNAI.">SRI VENKATESWARA COLLEGE OF ENGINEERING (SVCE), CHENNAI.</option>
                      <option value="SRM UNIVERSITY, KATTANKULATHUR, CHENNAI">SRM UNIVERSITY, KATTANKULATHUR, CHENNAI</option>
                      <option value="SRM UNIVERSITY, NCR CAMPUS">SRM UNIVERSITY, NCR CAMPUS</option>
                      <option value="SRNB DEGREE COLLEGE, HYDERABAD">SRNB DEGREE COLLEGE, HYDERABAD</option>
                      <option value="SSM INSTITUTE OF ENGINEERING AND TECHNOLOGY (SSMIET), DINDIGUL">SSM INSTITUTE OF ENGINEERING AND TECHNOLOGY (SSMIET), DINDIGUL</option>
                      <option value="SSU, MEERUT">SSU, MEERUT</option>
                      <option value="ST. JOSEPH'S COLLEGE OF ENGINEERING AND TECHNOLOGY, PALAI">ST. JOSEPH'S COLLEGE OF ENGINEERING AND TECHNOLOGY, PALAI</option>
                      <option value="ST. XAVIER'S SR. SEC. SCHOOL, HARDOI">ST. XAVIER'S SR. SEC. SCHOOL, HARDOI</option>
                      <option value="SUNBEAM SCHOOL, VARUNA, VARANASI">SUNBEAM SCHOOL, VARUNA, VARANASI</option>
                      <option value="SUNDER DEEP ENGINEERING COLLEGE,GHAZIABAD">SUNDER DEEP ENGINEERING COLLEGE,GHAZIABAD</option>
                      <option value="SURENDRA INSTITUTE OF ENGINEERING AND MANAGEMENT, SILIGURI">SURENDRA INSTITUTE OF ENGINEERING AND MANAGEMENT, SILIGURI</option>
                      <option value="SWAMI HARSEWANAND PUBLIC SCHOOL, VARANASI">SWAMI HARSEWANAND PUBLIC SCHOOL, VARANASI</option>
                      <option value="SWAMI KESHVANAND INSTITUTE OF TECHNOLOGY MANAGEMENT (SKTM), JAIPUR">SWAMI KESHVANAND INSTITUTE OF TECHNOLOGY MANAGEMENT (SKTM), JAIPUR</option>
                      <option value="TECHNO INDIA BANIPUR">TECHNO INDIA BANIPUR</option>
                      <option value="TEERTHANKAR MAHAVEER UNIVERSITY, MORADABAD">TEERTHANKAR MAHAVEER UNIVERSITY, MORADABAD</option>
                      <option value="TEERTHANKER MAHAVEER UNIVERSITY, MORADABAD">TEERTHANKER MAHAVEER UNIVERSITY, MORADABAD</option>
                      <option value="THAKUR COLLEGE OF ENGINEERING AND TECHNOLOGY, MUMBAI">THAKUR COLLEGE OF ENGINEERING AND TECHNOLOGY, MUMBAI</option>
                      <option value="THAKUR PRASAD SINGH COLLEGE (TPS), PATNA">THAKUR PRASAD SINGH COLLEGE (TPS), PATNA</option>
                      <option value="THANGAL KUNJU MUSALIAR COLLEGE OF ENGINEERING, KOLLAM">THANGAL KUNJU MUSALIAR COLLEGE OF ENGINEERING, KOLLAM</option>
                      <option value="THAPAR UNIVERSITY , PATIALA">THAPAR UNIVERSITY , PATIALA</option>
                      <option value="THIAGARAJAR COLLEGE OF ENGINEERING">THIAGARAJAR COLLEGE OF ENGINEERING</option>
                      <option value="TIANJIN MEDICAL UNIVERSITY">TIANJIN MEDICAL UNIVERSITY</option>
                      <option value="TKR COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD">TKR COLLEGE OF ENGINEERING AND TECHNOLOGY, HYDERABAD</option>
                      <option value="U.V.PATEL COLLEGE OF ENGINEERING">U.V.PATEL COLLEGE OF ENGINEERING</option>
                      <option value="UNITED COLLEGE OF ENGINEERING AND RESEARCH, ALLAHABAD">UNITED COLLEGE OF ENGINEERING AND RESEARCH, ALLAHABAD</option>
                      <option value="UNITED INSTITUTE OF MANAGEMENT, ALLAHABAD">UNITED INSTITUTE OF MANAGEMENT, ALLAHABAD</option>
                      <option value="UNITED INSTITUTE OF TECHNOLOGY, ALLAHABAD">UNITED INSTITUTE OF TECHNOLOGY, ALLAHABAD</option>
                      <option value="UNIVERSAL COLLEGE OF ENGINEERING AND TECHNOLOGY, AHMEDABAD">UNIVERSAL COLLEGE OF ENGINEERING AND TECHNOLOGY, AHMEDABAD</option>
                      <option value="UNIVERSITY COLLEGE OF ENGINEERING, KAKINADA">UNIVERSITY COLLEGE OF ENGINEERING, KAKINADA</option>
                      <option value="UNIVERSITY COLLEGE OF ENGINEERING, PATIALA">UNIVERSITY COLLEGE OF ENGINEERING, PATIALA</option>
                      <option value="UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY (UIET),KURUKSHETRA">UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY (UIET),KURUKSHETRA</option>
                      <option value="UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY (UIET) , CSJM , KANPUR">UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY (UIET) , CSJM , KANPUR</option>
                      <option value="UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY, KANPUR">UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY, KANPUR</option>
                      <option value="UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY, PANJAB UNIVERSITY">UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY, PANJAB UNIVERSITY</option>
                      <option value="UNIVERSITY INSTITUTE OF TECHNOLOGY, RGPV (UIT RGPV), BHOPAL">UNIVERSITY INSTITUTE OF TECHNOLOGY, RGPV (UIT RGPV), BHOPAL</option>
                      <option value="UNIVERSITY INSTITUTE OF TECHNOLOGY, BURDWAN UNIVERSITY (UIT BU), BURDWAN">UNIVERSITY INSTITUTE OF TECHNOLOGY, BURDWAN UNIVERSITY (UIT BU), BURDWAN</option>
                      <option value="UNIVERSITY OF ALLAHABAD, ALLAHABAD">UNIVERSITY OF ALLAHABAD, ALLAHABAD</option>
                      <option value="UNIVERSITY OF ENGINEERING AND MANAGEMENT (UEM) , JAIPUR">UNIVERSITY OF ENGINEERING AND MANAGEMENT (UEM) , JAIPUR</option>
                      <option value="UNIVERSITY OF ENGINEERING AND MANAGEMENT, KOLKATA">UNIVERSITY OF ENGINEERING AND MANAGEMENT, KOLKATA</option>
                      <option value="UNIVERSITY OF HYDERABAD">UNIVERSITY OF HYDERABAD</option>
                      <option value="UNIVERSITY OF LUCKNOW">UNIVERSITY OF LUCKNOW</option>
                      <option value="UNIVERSITY OF PETROLEUM AND ENERGY STUDIES(UPES), DEHRADUN">UNIVERSITY OF PETROLEUM AND ENERGY STUDIES(UPES), DEHRADUN</option>
                      <option value="UNIVERSITY OF PETROLEUM AND ENERGY STUDIES, DEHRADUN">UNIVERSITY OF PETROLEUM AND ENERGY STUDIES, DEHRADUN</option>
                      <option value="UNIVERSITY SCHOOL OF CHEMICAL TECHNOLOGY, GURU GOBIND SINGH INDRAPRASTHA UNIVERSITY">UNIVERSITY SCHOOL OF CHEMICAL TECHNOLOGY, GURU GOBIND SINGH INDRAPRASTHA UNIVERSITY</option>
                      <option value="USHA MITTAL INSTITUTE OF TECHNOLOGY, MUMBAI">USHA MITTAL INSTITUTE OF TECHNOLOGY, MUMBAI</option>
                      <option value="UTTAR PRADESH TECHNICAL UNIVERSITY (UPTU), LUCKNOW">UTTAR PRADESH TECHNICAL UNIVERSITY (UPTU), LUCKNOW</option>
                      <option value="VARDHMAN COLLEGE, ITARSI">VARDHMAN COLLEGE, ITARSI</option>
                      <option value="VEER BAHADUR SINGH PURVANCHAL UNIVERSITY (VBSPU), JAUNPUR">VEER BAHADUR SINGH PURVANCHAL UNIVERSITY (VBSPU), JAUNPUR</option>
                      <option value="VEER SURENDRA SAI UNIVERSITY OF TECHNOLOGY (VSSUT), BURLA">VEER SURENDRA SAI UNIVERSITY OF TECHNOLOGY (VSSUT), BURLA</option>
                      <option value="VEERMATA JIJABAI TECHNOLOGICAL INSTITUTE (VJTI), MUMBAI">VEERMATA JIJABAI TECHNOLOGICAL INSTITUTE (VJTI), MUMBAI</option>
                      <option value="VELLORE INSTITUTE OF TECHNOLOGY (VIT), CHENNAI">VELLORE INSTITUTE OF TECHNOLOGY (VIT), CHENNAI</option>
                      <option value="VELLORE INSTITUTE OF TECHNOLOGY (VIT), VELLORE">VELLORE INSTITUTE OF TECHNOLOGY (VIT), VELLORE</option>
                      <option value="VELTECH DR. RR AND DR. SR UNIVERSITY, CHENNAI">VELTECH DR. RR AND DR. SR UNIVERSITY, CHENNAI</option>
                      <option value="VIGNAN'S UNIVERSITY, HYDERABAD">VIGNAN'S UNIVERSITY, HYDERABAD</option>
                      <option value="VIMAL JYOTHI ENGINEERING COLLEGE, KANNUR">VIMAL JYOTHI ENGINEERING COLLEGE, KANNUR</option>
                      <option value="VISVESVARAYA TECHNOLOGICAL UNIVERSITY (VTU), BANGALORE">VISVESVARAYA TECHNOLOGICAL UNIVERSITY (VTU), BANGALORE</option>
                      <option value="VIVEKANAND SR. SEC. SCHOOL, LOHARU">VIVEKANAND SR. SEC. SCHOOL, LOHARU</option>
                      <option value="VNIT, NAGPUR">VNIT, NAGPUR</option>
                      <option value="WALCHAND COLLEGE OF ENGINEERING, SANGLI">WALCHAND COLLEGE OF ENGINEERING, SANGLI</option>
                      <option value="YMCA UNIVERSITY OF SCIENCE AND TECHNOLOGY, FARIDABAD">YMCA UNIVERSITY OF SCIENCE AND TECHNOLOGY, FARIDABAD</option>
                      <option value="YOGANANDHA INSTITUTE OF SCIENCE AND TECHNOLOGY">YOGANANDHA INSTITUTE OF SCIENCE AND TECHNOLOGY</option>
                      <option value="ZAKIR HUSSAIN COLLEGE OF ENGINEERING AND TECHNOLOGY, AMU">ZAKIR HUSSAIN COLLEGE OF ENGINEERING AND TECHNOLOGY, AMU</option>
                      <option value="BLDEA'S ENGINEERING COLLEGE, VIJAYAPUR">BLDEA'S ENGINEERING COLLEGE, VIJAYAPUR</option>
                      <option value="MAHATMA GANDHI INSTITUTE OF TECHNOLOGY, HYDERABAD">MAHATMA GANDHI INSTITUTE OF TECHNOLOGY, HYDERABAD</option>
                      <option value='IIIT Gwalior' >IIIT Gwalior</option>
                      <option value='IIIT Allahabad' >IIIT Allahabad</option>
                      <option value='IIIT Jabalpur' >IIIT Jabalpur</option>
                      <option value='IIIT Kancheepuram' >IIIT Kancheepuram</option>
                      <option value='IIIT Sri City, Chittoor' >IIIT Sri City, Chittoor</option>
                      <option value='IIIT Guwahati' >IIIT Guwahati</option>
                      <option value='IIIT Vadodara' >IIIT Vadodara</option>
                      <option value='IIIT Kota' >IIIT Kota</option>
                      <option value='IIIT Srirangam' >IIIT Srirangam</option>
                      <option value='IIIT Una' >IIIT Una</option>
                      <option value='IIIT Sonepat' >IIIT Sonepat</option>
                      <option value='IIIT Kalyani' >IIIT Kalyani</option>
                      <option value='IIIT Lucknow' >IIIT Lucknow</option>
                      <option value='IIIT Dharwad' >IIIT Dharwad</option>
                      <option value='IIIT Kurnool' >IIIT Kurnool</option>
                      <option value='IIIT Kottayam' >IIIT Kottayam</option>
                      <option value='IIIT Manipur' >IIIT Manipur</option>
                      <option value='IIIT Nagpur' >IIIT Nagpur</option>
                      <option value='IIIT Pune' >IIIT Pune</option>
                      <option value='IIIT Ranchi' >IIIT Ranchi</option>
                    </datalist>
                </div>
                <div className="element">
                  <label htmlFor="year">Year</label>
                  <input name="year" placeholder="Year" list="years" onChange={handleChange} value={userInfo?userInfo.year:null} disabled={userInfo?true:false} required={true}/>
                  <datalist id="years">
                    <option value="1">First</option>
                    <option value="2">Second</option>
                    <option value="3">Third</option>
                    <option value="4">Fourth</option>
                    <option value="5">Fifth</option>
                  </datalist>
                </div>
                <div className="element">
                  <label htmlFor="mobile_number">Mobile Number:</label>
                  <input type="tel" name="mobile_number" placeholder="Mobile Number" onChange={handleChange} value={userInfo?userInfo.mobile_number:null} disabled={userInfo?true:false} required={true}/>
                </div>
                <div className="element">
                  <label htmlFor="whatsapp_number">Whatsapp Number:</label>
                  <input type="tel" name="whatsapp_number" placeholder="Whatsapp Number" onChange={handleChange} required={true}/>
                </div>
                <div className="element">
                  <label htmlFor="postal_address">postal address:</label>
                  {/* <input type="text" name='postal_address' onChange={handleChange} placeholder="Address" required={true}/> */}
                  <textarea maxLength={500} type="text" name='postal_address' onChange={handleChange} placeholder="Address" required={true} rows={3}/>
                </div>
                <div className="element">
                  <label htmlFor="pincode">pincode:</label>
                  <input type="text" name='pincode' onChange={handleChange} placeholder="Pincode" required={true}/>
                </div>
                <div className="element">
                  <label htmlFor="pass2">Password:</label>
                  <input type="password" name='pass2' onChange={handleChange} placeholder={userInfo?"*********":"Password"} disabled={userInfo?true:false} required={true} minLength={8}/>
                </div>
                <div className="element">
                  <label htmlFor="confirm_password">Confirm Password:</label>
                  <input type="password" name='confirm_password' placeholder={userInfo?"*********":"Confirm Password"} onChange={handleChange} value={formData.confirm_password} disabled={userInfo?true:false} required={true} minLength={8}/>
                </div>
                <div className="element">
                  <label htmlFor="reason">reason:</label>
                  {/* <input type="text" name='reason' placeholder='Why should we choose you ?' onChange={handleChange} required={true}/> */}
                  <textarea maxLength={500} type="text" name='reason' placeholder='Why should we choose you ?' onChange={handleChange} required={true} rows={3}/>
                </div>
                {
                  requesting ? 
                  <div className="applying">Applying.... </div> :
                  <input type="submit" value="Apply" />
                }
                
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Ambassador
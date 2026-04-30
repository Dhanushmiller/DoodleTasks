import { useState, useEffect } from 'react'
import './App.css'
import { countries, stateCityData } from './data'
import Card from './components/Card'
import Input from './components/Input'
import Button from './components/Button'

function App() {
  const [formData, setFormData] = useState({
    publicFigure: true,
    animetaVerified: false,
    aniAppOnboarded: false,
    delistCreator: false,
    managedBy: 'self',
    creatorName: 'name',
    instagramHandle: 'modi',
    creatorType: 'male',
    mobileNumber: '',
    email: '',
    pocName: '',
    pocMobile: '',
    pocEmail: '',
    relationship: '',
    country: 'India',
    state: '',
    city: ''
  });

  const [savingStatus, setSavingStatus] = useState('Save As Draft');
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (name, value) => {
    // --- MENTOR UPDATION: CHILD EXPLICITLY SENDS DATA TO PARENT ---
    console.log(`[Parent] The Child component "${name}" explicitly sent this data:`, value);

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;
    console.log('[Parent] State changed by Child (select):', newState);
    setFormData(prev => ({
      ...prev,
      state: newState,
      city: '' // Reset city when state changes
    }));
  };

  const handleSave = () => {
    console.log('Form data being saved:', formData);

    setIsSaving(true);
    setSavingStatus('Saving...');

    setTimeout(() => {
      setSavingStatus('Saved!');
      alert('Draft saved successfully!');

      setTimeout(() => {
        setSavingStatus('Save As Draft');
        setIsSaving(false);
      }, 2000);
    }, 1000);
  };

  const states = Object.keys(stateCityData).sort();
  const cities = formData.state ? stateCityData[formData.state] : [];

  return (
    <div className="container">
      <Card className="toggle-bar">
        <div className="toggle-item">
          <span className="label">Public Figure</span>
          <label className="switch">
            <input
              type="checkbox"
              name="publicFigure"
              checked={formData.publicFigure}
              onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="toggle-item">
          <span className="label">Animeta Verified</span>
          <label className="switch">
            <input
              type="checkbox"
              name="animetaVerified"
              checked={formData.animetaVerified}
              onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="toggle-item">
          <span className="label">Ani App Onboarded</span>
          <label className="switch">
            <input
              type="checkbox"
              name="aniAppOnboarded"
              checked={formData.aniAppOnboarded}
              onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="toggle-item">
          <span className="label">Delist Creator</span>
          <label className="switch">
            <input
              type="checkbox"
              name="delistCreator"
              checked={formData.delistCreator}
              onChange={(e) => handleInputChange(e.target.name, e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </Card>

      <Card className="managed-by">
        <span className="label">Managed By</span>
        <div className="radio-group">
          <label className="radio-container">
            <input 
              type="radio" 
              name="managedBy" 
              value="self" 
              checked={formData.managedBy === 'self'}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <span className="checkmark"></span>
            Self
          </label>
          <label className="radio-container">
            <input 
              type="radio" 
              name="managedBy" 
              value="agency" 
              checked={formData.managedBy === 'agency'}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            <span className="checkmark"></span>
            Agency
          </label>
        </div>
      </Card>

      <Card className="form-container">
        <div className="tabs">
          <div className="tab active">Contact Details</div>
        </div>

        <form id="contactForm" onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <Input
              label="Creator Full Name"
              name="creatorName"
              value={formData.creatorName}
              onChange={handleInputChange}
              placeholder="name"
              required
            />
            <Input
              label="Instagram Handle"
              name="instagramHandle"
              value={formData.instagramHandle}
              onChange={handleInputChange}
              placeholder="narendra"
            />
            <div className="form-group">
              <label>Creator Type</label>
              <select
                name="creatorType"
                value={formData.creatorType}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <Input
              label="Direct Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              isPhone
            />
            <Input
              label="Creator Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter"
            />
            <Input
              label="Contact POC Name (If Other Than Creator)"
              name="pocName"
              value={formData.pocName}
              onChange={handleInputChange}
              placeholder="Enter"
            />

            <Input
              label="POC Mobile Number"
              name="pocMobile"
              value={formData.pocMobile}
              onChange={handleInputChange}
              placeholder="Enter mobile number"
              isPhone
            />
            <Input
              label="POC Email ID"
              type="email"
              name="pocEmail"
              value={formData.pocEmail}
              onChange={handleInputChange}
              placeholder="Enter"
            />
            <Input
              label="Relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleInputChange}
              placeholder="Enter"
            />

            <div className="form-group">
              <label>City</label>
              <select
                name="city"
                value={formData.city}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleStateChange}
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-footer">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              style={savingStatus === 'Saved!' ? { backgroundColor: '#ee3131', color: '#fff' } : {}}
            >
              {savingStatus}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default App

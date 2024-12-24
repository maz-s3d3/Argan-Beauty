import {useState} from 'react'
export default function AddAdmin(){
    const [formData,setFormData]=useState({
        nom:"",
        prenom:"",
        numero_telephone:"",
        permission:"",
        email:"",
        mot_de_pass:"",
        confirm_mot_de_pass:"",
    })
    const [message,setMessage]=useState("")
    const  [loading,setLoading]=useState(false)
    const handleChange= (e)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        setMessage("")
        setLoading(true)
        if(formData.mot_de_pass !== formData.confirm_mot_de_pass){
            setMessage("Password does not match")
            setLoading(false)
            return
        }
        const payload = formData ;

        
        try {
            const response = await fetch(
              "https://2f98-196-117-24-244.ngrok-free.app/Argan_beauty/AddAdmin.php",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "ngrok-skip-browser-warning": true,
                },
                body: JSON.stringify({...payload }),
              }
            );
      
            const data = await response.json();
      
            if (!response.ok) {
              throw new Error(data.error || "An error occurred");
            }
      
            setMessage(data.message || "Success!");
            localStorage.setItem("id_admin", data.id_admin); // Store id_admin/token
            console.log("Admin logged in:", data.id_admin);
            
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        };   

    return(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Add An Admin
        </h1>
        {message && (
          <p
            className={`mb-4 p-3 rounded ${
              message.includes("error")
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-3 border rounded" type="text" name='nom' placeholder='Last Name' value={formData.nom} onChange={handleChange} required/>
          <input className="w-full p-3 border rounded" type="text" name='prenom' placeholder='First Name' value={formData.prenom} onChange={handleChange} required/>
          <input className="w-full p-3 border rounded" type="number" name='numero_telephone' placeholder='Number' value={formData.numero_telephone} onChange={handleChange} />
          <input className="w-full p-3 border rounded" type="text" name='permission' placeholder='Permession' value={formData.permission} onChange={handleChange} required/>
          <input className="w-full p-3 border rounded" type="text" name='email' placeholder='Email' value={formData.email} onChange={handleChange} required/>
          <input className="w-full p-3 border rounded" type="text" name='mot_de_pass' placeholder='Password' value={formData.mot_de_pass} onChange={handleChange} required/>
          <input className="w-full p-3 border rounded" type="text" name='confirm_mot_de_pass' placeholder='Confirm Password' value={formData.confirm_mot_de_pass} onChange={handleChange} required/>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {loading ? "Processing..." : "Register" }
        </button>
        </form>
        </div>
    </div>
    )
}

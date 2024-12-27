import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    numero_telephone: "",
    email: "",
    mot_de_pass: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (isRegister && formData.mot_de_pass !== formData.confirm_password) {
      setMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    const action = isRegister ? "register" : "login";
    const payload = isRegister 
      ? formData 
      : { email: formData.email, mot_de_pass: formData.mot_de_pass };

    try {
      const response = await fetch(
        "https://fe14-196-117-24-244.ngrok-free.app/Argan_beauty/auth.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": true,
          },
          body: JSON.stringify({ action, ...payload }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }

      setMessage(data.message || "Success!");
      if (!isRegister && data.id_user) {
        localStorage.setItem("user_id", data.id_user);
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            {isRegister ? "Create Account" : "Welcome Back"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert 
              className={`mb-6 ${
                message.includes("error") ? "bg-red-50" : "bg-green-50"
              }`}
            >
              <AlertDescription 
                className={message.includes("error") ? "text-red-600" : "text-green-600"}
              >
                {message}
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    type="text"
                    name="nom"
                    placeholder="Last Name"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="prenom"
                    placeholder="First Name"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Input
                  type="tel"
                  name="numero_telephone"
                  placeholder="Phone Number"
                  value={formData.numero_telephone}
                  onChange={handleChange}
                  required
                />
              </>
            )}
            
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              type="password"
              name="mot_de_pass"
              placeholder="Password"
              value={formData.mot_de_pass}
              onChange={handleChange}
              required
            />
            
            {isRegister && (
              <Input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            )}

            {message === "Login successful." ? (
              <Button className="w-full" asChild>
                <Link to="/">Go to Home</Link>
              </Button>
            ) : (
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isRegister ? "Create Account" : "Sign In"
                )}
              </Button>
            )}
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">
              {isRegister ? "Already have an account? " : "Don't have an account? "}
            </span>
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              {isRegister ? "Sign In" : "Create Account"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
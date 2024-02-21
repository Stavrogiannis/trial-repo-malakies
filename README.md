# Steps to deploy on Kubernetes under specific Path/Subdomain

# React Part
add BrowserRouter
use it as such 
 <BrowserRouter basename="/dashboard/50">
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
</BrowserRouter>

add in the package.json
"homepage":"."

# use the Nginx.conf
as is parameterize for your specific path/subdomain

# DockerFile
use as is



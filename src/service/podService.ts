const createNewPod = async () => {
    const query = `
        PREFIX solid: <http://www.w3.org/ns/solid/terms#>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        INSERT DATA {
            ?pod solid:account ?account ;
                foaf:name "John Doe" ;
                foaf:email "john.doe@example.com" .
                
            ?account solid:accountName "johndoe" ;
                solid:password "password123" .
        }
    `;
    
    const response = await fetch('https://localhost:3000/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/sparql-update',
        },
        body: query,
    });
    
}
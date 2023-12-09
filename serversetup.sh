cd ~; 
rm -r ./Server; 
unzip ./serverbuild.zip -d ./;
chmod 777 efbundle;
touch appsettings.json;
echo "{\"ConnectionStrings\": {\"TodoContext\": \"User ID=postgres;Password=postgres;Host=localhost;Port=5433;Database=Organize;\"}\}" | cat > appsettings.json;
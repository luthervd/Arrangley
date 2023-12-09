cd ~; 
rm -r ./Server; 
unzip ./serverbuild.zip -d ./;
chmod 777 efbundle;
touch appsettings.json;
echo "{\"ConnectionStrings\": {\"TodoContext\": \"User ID=postgres;Password=${DBP};Host=localhost;Port=5432;Database=Organize;\"}}" | cat > appsettings.json;
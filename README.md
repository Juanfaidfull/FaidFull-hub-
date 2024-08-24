loadstring(game:HttpGet(("https://raw.githubusercontent.com/REDzHUB/LibraryV2/main/redzLib")))()
MakeWindow({
  Hub = {
    Title = "FaidiFull-hub🧊",
    Animation = "by : JuanDrako🧊"
  },
  Key = {
    KeySystem = false,
    Title = "Key System",
    Description = "",
    KeyLink = "",
    Keys = {"1234"},
    Notifi = {
      Notifications = true,
      CorrectKey = "Running the Script...",
      Incorrectkey = "The key is incorrect",
      CopyKeyLink = "Copied to Clipboard"
    }
  }
})

--[[
  Hub = {
    Title = "FaidiFull-hub🧊" -- <string> Titulo do seu script
    Animation = "by : JuanDrako🧊" -- <string> Adiciona um texto na animacão do seu HUB
  },
  Key = {
    KeySystem = <bollean> Adiciona um sistema de chaves
    Title = "Key System" <string> Adiciona um titulo ao seu sistema de chaves
    Description = "" <string> Adiciona uma descrição ao seu sistema de chaves
    KeyLink = "" <string> Adicina o Link onde pega a chave do HUB
    Keys = {"1234"} <table> Adiciona as Chaves
    Notifi = {
      Notifications = true <boolean> Adicina notificações ao sistema de chaves
      CorrectKey = "Running the Script..." <string> notificação quando a chave estiver correta
      Incorrectkey = "The key is incorrect" <string> notificação quando a chave estiver incorreta
      CopyKeyLink = "Copied to Clipboard" <string> notificação quando o link da chave fir copiado
    }
  }
]]

MinimizeButton({
  Image = "https://create.roblox.com/dashboard/creations/store/130419649627610/configure",
  Size = {40, 40},
  Color = Color3.fromRGB(10, 10, 10),
  Corner = true,
  Stroke = false,
  StrokeColor = Color3.fromRGB(255, 0, 0)
})
--[[
  Image = "https://create.roblox.com/dashboard/creations/store/130419649627610/configure" <string> imagem do botão
  Size = {40, 40} <table> tamanho do botão
  Color = Color3.fromRGB(10, 10, 10) <Color3>  Cor do fundo do botäo
  Corner = true -- <boolean> Adicina um UICorner
  Stroke = false <boolean> Adiciona um UIStroke
  StrokeColor = Color3.fromRGB(255, 0, 0) <Color3> Cor do UIStroke
]]
local Main = MakeTab({Name = "Main"})

--[[
  Name = "Main" <string> Nome da guia
]]
MakeNotifi({
  Title = "FaidFull-hub🧊",
  Text = "Notificação teste",
  Time = 5
})

--[[
  Title = "FaidFull-hub🧊" <string> titulo da notificação
  Text = "Notificação teste" <string> descrição da notificação
  Time = 5 <number> tempo da notificação
]]
local section = AddSection(Main, {"Teste"})
--[[
  {"Teste"} <table> nome da janela
]]
SetSection(section, "𝑩𝑳𝑶𝑿𝑭𝑹𝑼𝑰𝑺_𝑺𝑪𝑹𝑰𝑷𝑺🧊")

AddButton(Main, {
  Name = "REDZHUB",
  Callback = function()
    
  end
})

--[[
  Name = "REDZHUB" <string> nome do seu botão
  Callback = 
function()
loadstring(game:HttpGet("https://raw.githubusercontent.com/REDzHUB/BloxFruits/main/redz9999"))()
  end
]]
AddButton(Main, {
  Name = "XERO-HUB",
  Callback = function()
    
  end
})

--[[
  Name = "XERO-HUB" <string> nome do seu botão
  Callback = 
function()
loadstring(game:HttpGet("https://rawscripts.net/raw/Universal-Script-XeroHub-15621"))()
  end
]]
AddButton(Main, {
  Name = "SPEED-HUB",
  Callback = function()
    
  end
})

--[[
  Name = "speed-hub" <string> nome do seu botão
  Callback = 
function()
loadstring(game:HttpGet("https://raw.githubusercontent.com/AhmadV99/Speed-Hub-X/main/Speed%20Hub%20X.lua", true))()
  end
]]
AddButton(Main, {
  Name = "WAZURE-HUB",
  Callback = function()
    
  end
})
AddButton(Main, {
  Name = "WAZURE-HUB",
  Callback = 
function()
loadstring(game:HttpGet("https://rawscripts.net/raw/Blox-Fruits-W-Azure-12565"))()
    
  end
})
AddButton(Main, {
  Name = "Botão teste",
  Callback = function()
    
  end
})

--[[
  Name = "infinity yierd" <string> nome do seu botão
  Callback = 
function()
loadstring(game:HttpGet('https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source'))()
  end
]]

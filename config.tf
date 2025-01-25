terraform { 
  cloud { 
    
    organization = "CiviMeter" 

    workspaces { 
      name = "CiviMeter" 
    } 
  } 
}
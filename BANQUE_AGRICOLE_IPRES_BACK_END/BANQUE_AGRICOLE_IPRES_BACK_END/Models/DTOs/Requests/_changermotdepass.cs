using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public partial class _changermotdepass
{
    public _changermotdepass()
    {
    }

    public string Id { get; set; } = null!;
    [Required, DataType(DataType.Password), Display(Name = "Ancien mot de passe")]
    public string currentPassword { get; set; } = null!;
    [Required, DataType(DataType.Password), Display(Name = "Nouveau mot de passe")]
    public string newPassword { get; set; } = null!;

}

public partial class _changeremail
{
    public _changeremail()
    {
    }

    public string Id { get; set; } = null!;
    public string AncienEmail { get; set;} = null!;
    public string  email { get; set; } = null!;


}


public partial class _changerUserName
{
    public _changerUserName()
    {
    }

    public string Id { get; set; } = null!;
    public string  username { get; set; } = null!;


}

public partial class _changeremailU
{
    public _changeremailU()
    {
    }

    public string Id { get; set; } = null!;
    
    public string  email { get; set; } = null!;


}

public partial class _changermotdepassU
{
    public _changermotdepassU()
    {
    }

    public string Id { get; set; } = null!;
    public string newPassword { get; set; } = null!;

}
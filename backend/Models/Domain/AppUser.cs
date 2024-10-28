using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Domain
{
    public class AppUser : IdentityUser
    {
        [PersonalData]
        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }

        [PersonalData]
        [Column(TypeName = "nvarchar(10)")]
        public string Gender { get; set; }

        [PersonalData]
        public DateOnly DateOfBirth { get; set; }
        [PersonalData]
        public DateTime DateJoined { get; set; } = DateTime.Now;
    }
}

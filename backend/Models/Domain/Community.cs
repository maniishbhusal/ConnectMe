using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Domain
{
    [Index(nameof(Name), IsUnique = true)] // Makes Name property unique
    public class Community
    {
        public Guid Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [StringLength(500)]
        public string? Description { get; set; }

        [ForeignKey("CreatedByUser")]
        public string CreatedBy { get; set; }
        public AppUser CreatedByUser { get; set; }
        public DateTime DateCreated { get; set; }

        [StringLength(255)]
        public string? ProfileImageUrl { get; set; }  // Optional Profile Image URL
    }
}

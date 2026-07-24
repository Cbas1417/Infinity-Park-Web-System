from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.contrib.auth.models import User as AuthUser
from .models import User

@receiver(post_delete, sender=User)
def delete_auth_user_on_user_profile_delete(sender, instance, **kwargs):
    """
    When a User profile is deleted, ensure the corresponding Django AuthUser is also deleted.
    Note: Deleting AuthUser directly will cascade-delete User profile automatically via OneToOneField.
    """
    if instance.id_user_id:
        AuthUser.objects.filter(pk=instance.id_user_id).delete()

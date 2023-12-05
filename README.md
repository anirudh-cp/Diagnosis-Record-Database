# Diagnosis Record Database

Application to store patient records and maintain record of diagnosis. Generate reports when required of patient history.

### Windows File Error:

In Windows when running the server, it prepends the drive name (D:) to the uploaded file path which does not work with dropbox.
To fix go here and follow [instructions.](https://stackoverflow.com/questions/55587089/django-storages-dropbox-stone-validators-validationerror)

    env\Lib\site-packages\storages\backends\dropbox.py

### Local Run:

#### Setup:

    pip install -r requirements.txt

#### Set Environment Variables:

.env file in root.

    DEBUG=1
    DJANGO_SUPERUSER_EMAIL="xxxx"
    DJANGO_SUPERUSER_PASSWORD="xxxx"
    DJANGO_SECRET_KEY="xxxx"

    POSTGRES_READY=0

    DB_IGNORE_SSL="true"

    # Deployed Version
    # -------------
    POSTGRES_DB="xxxx"
    POSTGRES_PASSWORD="xxxx"
    POSTGRES_USER="xxxx"
    POSTGRES_HOST="xxxx"
    POSTGRES_PORT=xxxx

    # Dropbox file upload
    # -------------
    DROPBOX_OAUTH2_REFRESH_TOKEN="xxxx"
    DROPBOX_APP_SECRET="xxxx"
    DROPBOX_APP_KEY="xxxx"


Migrate schema:

    python manage.py runserver

#### Run:

    python manage.py runserver
"""empty message

Revision ID: da4451281321
Revises: 
Create Date: 2023-07-27 00:40:47.667616

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da4451281321'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('form_response_id', sa.String(), nullable=False))
        batch_op.alter_column('field_id',
               existing_type=sa.VARCHAR(),
               nullable=False)
        batch_op.create_foreign_key(None, 'fields', ['field_id'], ['composite_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('answers', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('field_id',
               existing_type=sa.VARCHAR(),
               nullable=True)
        batch_op.drop_column('form_response_id')

    # ### end Alembic commands ###
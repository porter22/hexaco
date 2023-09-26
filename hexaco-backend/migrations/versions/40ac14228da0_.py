"""empty message

Revision ID: 40ac14228da0
Revises: 0f5282b37359
Create Date: 2023-08-23 20:51:18.473878

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '40ac14228da0'
down_revision = '0f5282b37359'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hexaco_mapping', schema=None) as batch_op:
        batch_op.add_column(sa.Column('question_text', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('question_number', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('NRCode', sa.String(), nullable=False))
        batch_op.drop_column('Code')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('hexaco_mapping', schema=None) as batch_op:
        batch_op.add_column(sa.Column('Code', sa.VARCHAR(), autoincrement=False, nullable=False))
        batch_op.drop_column('NRCode')
        batch_op.drop_column('question_number')
        batch_op.drop_column('question_text')

    # ### end Alembic commands ###
"""
The main module of the application.
"""

import streamlit as st
from datetime import datetime
from budgetvisualizer.backend.data_handler import get_statements_for_month


def main():
    """The main function of the application."""
    st.title("Budget Visualizer")
    current_month = datetime.now().strftime("%B %Y")
    st.header(f"Statements for {current_month}")
    selected_month = st.date_input("Select a month", datetime.now(), format="MM")
    statements = get_statements_for_month(selected_month)
    if not statements:
        st.write("No statements found for the current month.")
    else:
        for statement in statements:
            st.write(statement)


if __name__ == "__main__":
    main()
